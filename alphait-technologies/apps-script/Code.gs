/**
 * Alpha IT Technologies — site content API.
 *
 * Paste this file into the Apps Script editor of the Google Sheet that stores the
 * site content (Extensions → Apps Script), then deploy it as a web app.
 * Setup steps are in ADMIN-SETUP.md at the project root.
 *
 * Script Properties (Project Settings → Script properties):
 *   ADMIN_USERNAME  required — admin login name
 *   ADMIN_PASSWORD  required — admin login password
 *   TOKEN_SECRET    created automatically on first login; delete it to sign every admin out
 *   SPREADSHEET_ID  only for a standalone script — set automatically by setup()
 *   IMAGE_FOLDER_ID Drive folder for uploaded images — set automatically on first upload
 */

var SHEET_NAME = 'Content'
var SESSION_HOURS = 8
var MAX_VALUE_LENGTH = 45000 // a Sheet cell holds 50,000 characters
var MAX_CHANGES = 200
var MAX_UPLOAD_BYTES = 5 * 1024 * 1024
var IMAGE_FOLDER = 'Alpha IT Technologies — Site Images'
var MAX_FAILED_LOGINS = 10 // per 15 minutes, across all clients

function doGet() {
  return json_({ ok: true, content: readAll_() })
}

function doPost(e) {
  var body
  try {
    body = JSON.parse(e.postData.contents)
  } catch (err) {
    return json_({ ok: false, error: 'Bad request' })
  }

  if (body.action === 'login') return json_(login_(body.username, body.password))

  if (!verifyToken_(body.token)) return json_({ ok: false, error: 'Session expired', auth: false })

  if (body.action === 'save') {
    var single = {}
    single[body.key] = body.value
    return json_(saveMany_(single))
  }
  if (body.action === 'saveMany') return json_(saveMany_(body.changes))
  if (body.action === 'upload') return json_(upload_(body.name, body.mimeType, body.data))
  if (body.action === 'verify') return json_({ ok: true })

  return json_({ ok: false, error: 'Unknown action' })
}

// ---------- content ----------

// Run once from the editor (select "setup" → Run) to authorize and print the sheet URL.
function setup() {
  sheet_()
  var props = PropertiesService.getScriptProperties()
  Logger.log('Content sheet: ' + spreadsheet_().getUrl())
  Logger.log('Image folder: ' + imageFolder_().getUrl())
  Logger.log(
    props.getProperty('ADMIN_USERNAME') && props.getProperty('ADMIN_PASSWORD')
      ? 'Admin credentials are set.'
      : 'Missing ADMIN_USERNAME / ADMIN_PASSWORD in Script Properties.',
  )
}

// Uses the Sheet this script is attached to; a standalone script creates its own
// "Site Content" Sheet in Drive on first use and remembers it in SPREADSHEET_ID.
function spreadsheet_() {
  var active = SpreadsheetApp.getActiveSpreadsheet()
  if (active) return active

  var props = PropertiesService.getScriptProperties()
  var id = props.getProperty('SPREADSHEET_ID')
  if (id) return SpreadsheetApp.openById(id)

  var created = SpreadsheetApp.create('Alpha IT Technologies — Site Content')
  props.setProperty('SPREADSHEET_ID', created.getId())
  return created
}

function sheet_() {
  var ss = spreadsheet_()
  var sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME)
    sheet.getRange(1, 1, 1, 3).setValues([['key', 'value', 'updated']]).setFontWeight('bold')
    sheet.setFrozenRows(1)
    sheet.setColumnWidth(1, 280)
    sheet.setColumnWidth(2, 600)
  }
  return sheet
}

function readAll_() {
  var rows = sheet_().getDataRange().getValues()
  var content = {}
  for (var i = 1; i < rows.length; i++) {
    var key = String(rows[i][0]).trim()
    if (key) content[key] = String(rows[i][1])
  }
  return content
}

// changes: { key: value }. A null value removes the override so the site falls back to
// its built-in content. All changes are applied together under one lock.
function saveMany_(changes) {
  if (!changes || typeof changes !== 'object') return { ok: false, error: 'Invalid changes' }
  var keys = Object.keys(changes)
  if (!keys.length || keys.length > MAX_CHANGES) return { ok: false, error: 'Invalid changes' }
  for (var k = 0; k < keys.length; k++) {
    var value = changes[keys[k]]
    if (!/^[\w.-]{1,200}$/.test(keys[k])) return { ok: false, error: 'Invalid key: ' + keys[k] }
    if (value !== null && (typeof value !== 'string' || value.length > MAX_VALUE_LENGTH)) {
      return { ok: false, error: 'Invalid value for ' + keys[k] }
    }
  }

  var lock = LockService.getScriptLock()
  lock.waitLock(20000)
  try {
    var sheet = sheet_()
    var existing = sheet.getRange(1, 1, Math.max(sheet.getLastRow(), 1), 1).getValues()
    var rowOf = {}
    for (var i = 1; i < existing.length; i++) {
      var name = String(existing[i][0]).trim()
      if (name) rowOf[name] = i + 1
    }

    var now = new Date()
    var appends = []
    var deletes = []
    keys.forEach(function (key) {
      var value = changes[key]
      var row = rowOf[key]
      if (value === null) {
        if (row) deletes.push(row)
        return
      }
      // Leading apostrophe stops the Sheet from turning "98%" or "+1 (732)…" into numbers/formulas.
      var cells = [key, "'" + value, now]
      if (row) sheet.getRange(row, 1, 1, 3).setValues([cells])
      else appends.push(cells)
    })

    if (appends.length) {
      sheet.getRange(sheet.getLastRow() + 1, 1, appends.length, 3).setValues(appends)
    }
    deletes
      .sort(function (a, b) {
        return b - a
      })
      .forEach(function (row) {
        sheet.deleteRow(row)
      })
  } finally {
    lock.releaseLock()
  }
  return { ok: true }
}

// Stores an image in a Drive folder shared "anyone with the link can view" and returns
// a URL the site can use in <img src>.
function upload_(name, mimeType, data) {
  if (!/^image\/(png|jpe?g|gif|webp|svg\+xml)$/.test(String(mimeType))) {
    return { ok: false, error: 'Only PNG, JPG, GIF, WebP or SVG images can be uploaded' }
  }
  var bytes = Utilities.base64Decode(String(data))
  if (bytes.length > MAX_UPLOAD_BYTES) return { ok: false, error: 'Image is larger than 5 MB' }

  var file = imageFolder_().createFile(
    Utilities.newBlob(bytes, mimeType, String(name || 'image').slice(0, 120)),
  )
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)
  return { ok: true, url: 'https://lh3.googleusercontent.com/d/' + file.getId() }
}

function imageFolder_() {
  var props = PropertiesService.getScriptProperties()
  var id = props.getProperty('IMAGE_FOLDER_ID')
  if (id) {
    try {
      return DriveApp.getFolderById(id)
    } catch (err) {
      // Folder was deleted — make a new one below.
    }
  }
  var folder = DriveApp.createFolder(IMAGE_FOLDER)
  props.setProperty('IMAGE_FOLDER_ID', folder.getId())
  return folder
}

// ---------- auth ----------

function login_(username, password) {
  var props = PropertiesService.getScriptProperties()
  var cache = CacheService.getScriptCache()
  var failed = Number(cache.get('failed') || 0)
  if (failed >= MAX_FAILED_LOGINS) {
    return { ok: false, error: 'Too many attempts. Try again in 15 minutes.' }
  }

  var expectedUser = props.getProperty('ADMIN_USERNAME')
  var expectedPass = props.getProperty('ADMIN_PASSWORD')
  if (!expectedUser || !expectedPass) {
    return { ok: false, error: 'Admin credentials are not configured in Script Properties.' }
  }

  if (!safeEqual_(String(username), expectedUser) || !safeEqual_(String(password), expectedPass)) {
    cache.put('failed', String(failed + 1), 900)
    return { ok: false, error: 'Incorrect username or password' }
  }

  var expires = Date.now() + SESSION_HOURS * 3600 * 1000
  return { ok: true, token: expires + '.' + sign_(String(expires)), expires: expires }
}

function verifyToken_(token) {
  if (typeof token !== 'string') return false
  var parts = token.split('.')
  if (parts.length !== 2) return false
  if (Number(parts[0]) < Date.now()) return false
  return safeEqual_(parts[1], sign_(parts[0]))
}

function sign_(text) {
  var props = PropertiesService.getScriptProperties()
  var secret = props.getProperty('TOKEN_SECRET')
  if (!secret) {
    secret = Utilities.getUuid() + Utilities.getUuid()
    props.setProperty('TOKEN_SECRET', secret)
  }
  return Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(text, secret))
}

function safeEqual_(a, b) {
  if (a.length !== b.length) return false
  var diff = 0
  for (var i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
