const {
  default: makeWAconn,
  useMultiFileAuthState,
  DisconnectReason,
  getContentType,
  downloadContentFromMessage,
  fetchLatestBaileysVersion,
  Browsers,
  jidNormalizedUser,
} = require("@whiskeysockets/baileys");
const os = require("os");
const path = require("path");
const fs = require("fs");
const P = require("pino");
const FileType = require("file-type");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
const express = require("express");
const app = express();
const por = require("./session");
const port = por.PORT;
const ownerNumber = ["94779912589"];

if (!app) return;

// Session directory
const SESSION_DIR = "./sessions";
if (!fs.existsSync(SESSION_DIR)) fs.mkdirSync(SESSION_DIR);
const sess = require("./session");

async function sessdl() {
  try {
    // Extract the Base64 encoded session data
    const base64Data = sess.SESSION_ID.split("QUEEN VENUS =")[1];
    if (!base64Data) {
      throw new Error("Invalid SESSION_ID format - missing Base64 data");
    }

    // Delete the SESSION_DIR if it exists
    if (await fs.promises.stat(SESSION_DIR).catch(() => false)) {
      await fs.promises.rm(SESSION_DIR, { recursive: true, force: true });
      console.log("🧹 [ 👑 Queen Venus ] Existing session directory cleared.");
    }

    // Recreate the directory
    try {
      await fs.promises.mkdir(SESSION_DIR, { recursive: true });
      console.log("📁 [ 👑 Queen Venus ] New session directory safely created.");
    } catch (err) {
      console.error("❌ [ 👑 Queen Venus ] Error creating session directory:", err);
      return;
    }

    const credsPath = path.join(SESSION_DIR, "creds.json");

    // Decode and save the session data
    try {
      // Decode from Base64
      const decodedData = Buffer.from(base64Data, 'base64').toString('utf-8');
      
      // Parse the JSON data
      const sessionData = JSON.parse(decodedData);
      
      // Write to creds.json
      await fs.promises.writeFile(credsPath, JSON.stringify(sessionData, null, 2));
      console.log("🔐 [ 👑 Queen Venus ] Session data successfully decoded and saved.");
    } catch (err) {
      console.error("❌ [ 👑 Queen Venus ] Error processing session data:", err.message);
      
      // More specific error messages
      if (err instanceof SyntaxError) {
        console.error("⚠️ [ 👑 Queen Venus ] Invalid JSON format found in session data.");
      } else if (err.message.includes("Invalid base64")) {
        console.error("⚠️ [ 👑 Queen Venus ] Invalid Base64 encoding in session data.");
      }
      throw err;
    }
  } catch (err) {
    console.error("❌ [ 👑 Queen Venus ] Unexpected error in session setup:", err);
    throw err;
  }
}

//=====================================================

async function connectToWA() {
  try {
    await sessdl();
  } catch (error) {
    console.error("❌ [ 👑 Queen Venus ] Error during session download:", error);
    return;
  }

  const { loadCommands, handleCommand } = require("./src/utils/commandHandler");
  const config = require("./src/config/settings.cjs");
  const getPrefix = () => config.PREFIX;
  const getWelcome = () => config.WELCOME;
  
  //===========================
  console.log("🚀 [ 👑 Queen Venus ] System is booting up... (Version 1.0.3)");
  const { state, saveCreds } = await useMultiFileAuthState(
    __dirname + "/sessions/"
  );
  var { version } = await fetchLatestBaileysVersion();

  const conn = makeWAconn({
    logger: P({ level: "silent" }),
    printQRInTerminal: false,
    browser: Browsers.macOS("Firefox"),
    syncFullHistory: true,
    auth: state,
    version,
  });

  conn.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      if (
        lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut
      ) {
        console.log("🔄 [ 👑 Queen Venus ] Connection dropped. Reconnecting...");
        connectToWA();
      } else {
        console.log("⚠️ [ 👑 Queen Venus ] Logged out from WhatsApp. Please scan QR again.");
      }
    } else if (connection === "open") {
      console.log("🔥 [ 👑 Queen Venus ] Authenticating and Installing modules...");
      console.log("✅ [ 👑 Queen Venus ] Successfully Connected to WhatsApp!");
      
      // Beautifully formatted WhatsApp status message
      let up = `
      *𝓠𝓮𝓮𝓷 𝓥𝓮𝓷𝓾𝓼 👸 Connected Successfully!* ✅  
      
          --- *𝓠𝓮𝓮𝓷 𝓥𝓮𝓷𝓾𝓼 👸* ---

          ✦» 𝚅𝚎𝚛𝚜𝚒𝚘𝚗   : ${require("./package.json").version}
          ✦» 𝙿𝚕𝚊𝚝𝚏𝚘𝚛𝚖  : ${os.platform()}
          ✦» 𝙷𝚘𝚜𝚝      : ${os.hostname()}
          ✦» 𝙾𝚆𝙽𝙴𝚁     : ${config.BOT_NUMBER}
          
          --- *⚙️ Current Configurations:* ---

          ✦» **PREFIX:** ${config.PREFIX}
          ✦» **MODE:** ${config.MODE}

          ✦» **AUTO READ STATUS:** ${config.AUTOREADSTATUS ? "Active ✅" : "Inactive ❌"}
          ✦» **READ CMD:** ${config.READCMD ? "Active ✅" : "Inactive ❌"}
          ✦» **AUTO VOICE:** ${config.AUTOVOICE ? "Active ✅" : "Inactive ❌"}
          ✦» **AUTO STICKER:** ${config.AUTOSTICKER ? "Active ✅" : "Inactive ❌"}
          ✦» **AUTO REPLY:** ${config.AUTOREPLY ? "Active ✅" : "Inactive ❌"}
          ✦» **AUTO REACT:** ${config.AUTOREACT ? "Active ✅" : "Inactive ❌"}
          ✦» **WELCOME:** ${config.WELCOME ? "Active ✅" : "Inactive ❌"}
          ✦» **ANTI BAD:** ${config.ANTIBAD ? "Active ✅" : "Inactive ❌"}
          ✦» **ANTI BOT:** ${config.ANTIBOT ? "Active ✅" : "Inactive ❌"}
          ✦» **ANTI LINK:** ${config.ANTILINK ? "Active ✅" : "Inactive ❌"}
          ✦» **ALWAYS ONLINE:** ${config.ALLWAYSONLINE ? "Active ✅" : "Inactive ❌"}
          ✦» **MOROCCO BLOCK:** ${config.MOROCCOBLOCK ? "Active ✅" : "Inactive ❌"}
          ✦» **AUTO NEWS:** ${config.AUTONEWS ? "Active ✅" : "Inactive ❌"}
          ✦» **AUTO TYPING:** ${config.AUTOTYPING ? "Active ✅" : "Inactive ❌"}
          ✦» **AUTO RECORDING:** ${config.AUTORECORDING ? "Active ✅" : "Inactive ❌"}

          --- *Thank you for choosing 𝓠𝓮𝓮𝓷 𝓥𝓮𝓷𝓾𝓼 👸* ---

          We're here to make your WhatsApp experience more powerful.
          If you encounter any issues, feel free to reach out. 

          *Powering your connection!* 🛡️`;

      conn.sendMessage(conn.user.id, {
        text: up,
        contextInfo: {
          mentionedJid: ["94779912589@s.whatsapp.net"], 
          groupMentions: [],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363408995953713@newsletter",
            newsletterName: "𝓠𝓾𝓮𝓮𝓷 𝓥𝓮𝓷𝓾𝓼 𝓜𝓓 𝓥1.0.3 👸",
            serverMessageId: 999,
          },
          externalAdReply: {
            title: "𝓠𝓾𝓮𝓮𝓷 𝓥𝓮𝓷𝓾𝓼 𝓜𝓓 𝓥1.0.3 👸💛",
            body: "© 𝐌𝐑. 𝐇𝐀𝐍𝐒𝐀𝐊𝐀 𝐅𝐄𝐑𝐍𝐀𝐍𝐃𝐎 𝐎𝐅𝐂",
            mediaType: 1,
            sourceUrl: "https://wa.me/94779912589?text=Hey%20Hansaka%2C%20I%20am%20from%20Venus%20MD%20Whatsapp%20bot",
            thumbnailUrl:
              "https://i.ibb.co/0V2BdtpJ/Whats-App-Image-2026-03-28-at-12-07-53-AM.jpg", 
            renderLargerThumbnail: false,
            showAdAttribution: true,
          },
        },
      });
    }
  });

  //============================================================================
  const {
    getBuffer,
    getGroupAdmins,
    getRandom,
    h2k,
    isUrl,
    Json,
    runtime,
    sleep,
    fetchJson,
  } = require("./src/utils/functions");
  const { sms, downloadMediaMessage } = require("./src/utils/msg");
  
  //==========================================================================
  conn.ev.on("messages.upsert", async (mek) => {
    if (
      config.ALLWAYSONLINE === false &&
      mek.key &&
      mek.key.remoteJid !== "status@broadcast"
    ) {
      await conn.readMessages([mek.key]); 
    }
    mek = mek.messages[0];
    if (!mek.message) return;
    mek.message =
      getContentType(mek.message) === "ephemeralMessage"
        ? mek.message.ephemeralMessage.message
        : mek.message;
        
    if (
      mek.key &&
      mek.key.remoteJid === "status@broadcast" &&
      config.AUTOREADSTATUS === true
    ) {
      const participant = mek.key.participant || mek.key.remoteJid;
      if (!participant) {
        console.error(
          "⚠️ [ 👑 Queen Venus ] Participant or remoteJid is undefined. Skipping reaction."
        );
        return;
      }

      const botId =
        conn.user && conn.user.id
          ? conn.user.id.split(":")[0] + "@s.whatsapp.net"
          : null;
      if (!botId) {
        console.error("⚠️ [ 👑 Queen Venus ] Bot's user ID not available. Skipping reaction.");
        return;
      }

      await conn.sendMessage(
        mek.key.remoteJid,
        {
          react: {
            key: mek.key,
            text: `${config.EMOJI}`, 
          },
        },
        {
          statusJidList: [participant, botId],
        }
      );
      await conn.readMessages([mek.key]);
    }

    const prefix = getPrefix();
    const m = sms(conn, mek);
    const type = getContentType(mek.message);
    const content = JSON.stringify(mek.message);
    const from = mek.key.remoteJid;
    const quoted =
      type == "extendedTextMessage" &&
      mek.message.extendedTextMessage.contextInfo != null
        ? mek.message.extendedTextMessage.contextInfo.quotedMessage || []
        : [];
    const body =
      type === "conversation"
        ? mek.message.conversation
        : type === "extendedTextMessage"
        ? mek.message.extendedTextMessage.text
        : type == "interactiveResponseMessage"
        ? mek.message.interactiveResponseMessage &&
          mek.message.interactiveResponseMessage.nativeFlowResponseMessage &&
          JSON.parse(
            mek.message.interactiveResponseMessage.nativeFlowResponseMessage
              .paramsJson
          ) &&
          JSON.parse(
            mek.message.interactiveResponseMessage.nativeFlowResponseMessage
              .paramsJson
          ).id
        : type == "templateButtonReplyMessage"
        ? mek.message.templateButtonReplyMessage &&
          mek.message.templateButtonReplyMessage.selectedId
        : type == "imageMessage" && mek.message.imageMessage.caption
        ? mek.message.imageMessage.caption
        : type == "videoMessage" && mek.message.videoMessage.caption
        ? mek.message.videoMessage.caption
        : "";
        
    const isCmd = body.startsWith(prefix);
    const command = isCmd
      ? body.slice(prefix.length).trim().split(" ").shift().toLowerCase()
      : "";
    const args = body.trim().split(/ +/).slice(1);
    const q = args.join(" ");
    const isGroup = from.endsWith("@g.us");
    const sender = mek.key.fromMe
      ? conn.user.id.split(":")[0] + "@s.whatsapp.net" || conn.user.id
      : mek.key.participant || mek.key.remoteJid;
    const senderNumber = sender.split("@")[0];
    const botNumber = conn.user.id.split(":")[0];
    const pushname = mek.pushName || "Sin Nombre";
    const isMe = botNumber.includes(senderNumber);
    const isOwner =
      ownerNumber.includes(senderNumber) ||
      isMe ||
      config.SUDO.includes(senderNumber);
    const botNumber2 = await jidNormalizedUser(conn.user.id);
    const groupMetadata = isGroup
      ? await conn.groupMetadata(from).catch((e) => {})
      : "";
    const groupName = isGroup ? groupMetadata.subject : "";
    const participants = isGroup ? await groupMetadata.participants : "";
    const groupAdmins = isGroup ? await getGroupAdmins(participants) : "";
    const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false;
    const isAdmins = isGroup ? groupAdmins.includes(sender) : false;
    
    const reply = (teks) => {
      conn.sendMessage(from, { text: teks }, { quoted: mek });
    };

    conn.downloadAndSaveMediaMessage = async (
      message,
      filename,
      appendExtension = true
    ) => {
      let messageContent = message.msg ? message.msg : message;
      let mimeType = (message.msg || message).mimetype || "";
      let mediaType = message.mtype
        ? message.mtype.replace(/Message/gi, "")
        : mimeType.split("/")[0];

      const mediaStream = await downloadContentFromMessage(
        messageContent,
        mediaType
      );
      let mediaBuffer = Buffer.from([]);
      for await (const chunk of mediaStream) {
        mediaBuffer = Buffer.concat([mediaBuffer, chunk]);
      }

      let detectedFileType = await FileType.fromBuffer(mediaBuffer);
      let finalFileName = appendExtension
        ? `${filename}.${detectedFileType.ext}`
        : filename;

      await fs.writeFileSync(finalFileName, mediaBuffer);
      return finalFileName;
    };

    //======================================================================
    if (isCmd) {
      const args = body.slice(config.PREFIX.length).trim().split(/ +/);
      const commandName = isCmd
        ? body.slice(1).trim().split(" ")[0].toLowerCase()
        : false;

      // Handle the command
      handleCommand(conn, mek, m, {
        from,
        prefix,
        quoted,
        body,
        command: commandName,
        args,
        q,
        isGroup,
        sender,
        senderNumber,
        botNumber2,
        botNumber,
        pushname,
        isMe,
        isOwner,
        groupMetadata,
        groupName,
        participants,
        groupAdmins,
        isBotAdmins,
        isAdmins,
        reply,
      });
    }
  });
}

if (!app) return;

app.get("/", (req, res) => {
  res.send("✨ Hey I am alive! 𝓠𝓾𝓮𝓮𝓷 𝓥𝓮𝓷𝓾𝓼 𝓜𝓓 is up and running securely. ✅");
});

app.listen(port, () =>
  console.log(`🌐 [ 👑 Queen Venus ] Server perfectly listening on http://localhost:${port}`)
);

setTimeout(() => {
  connectToWA();
}, 4000);
