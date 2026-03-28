// ✦•·····························································································•✦ //
//                                                                                                   //
//                                       👑 𝗤𝗨𝗘𝗘𝗡 𝗩𝗘𝗡𝗨𝗦 𝗠𝗗 👑                                        //
//                                                                                                   //
//   ██████╗ ██╗   ██╗███████╗███████╗███╗   ██╗    ██╗   ██╗███████╗███╗   ██╗██╗   ██╗███████╗   //
//  ██╔═══██╗██║   ██║██╔════╝██╔════╝████╗  ██║    ██║   ██║██╔════╝████╗  ██║██║   ██║██╔════╝   //
//  ██║   ██║██║   ██║█████╗  █████╗  ██╔██╗ ██║    ██║   ██║█████╗  ██╔██╗ ██║██║   ██║███████╗   //
//  ██║▄▄ ██║██║   ██║██╔══╝  ██╔══╝  ██║╚██╗██║    ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║██║   ██║╚════██║   //
//  ╚██████╔╝╚██████╔╝███████╗███████╗██║ ╚████║     ╚████╔╝ ███████╗██║ ╚████║╚██████╔╝███████║   //
//   ╚══▀▀═╝  ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═══╝      ╚═══╝  ╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝   //
//                                                                                                   //
//                                    ███╗   ███╗██████╗                                             //
//                                    ████╗ ████║██╔══██╗                                            //
//                                    ██╔████╔██║██║  ██║                                            //
//                                    ██║╚██╔╝██║██║  ██║                                            //
//                                    ██║ ╚═╝ ██║██████╔╝                                            //
//                                    ╚═╝     ╚═╝╚═════╝                                             //
//                                                                                                   //
// ✦•·····························································································•✦ //
// * //
// * @project_name : ♛ 𝚀𝚄𝙴𝙴𝙽 𝚅𝙴𝙽𝚄𝚂 𝙼𝙳                                                               //
// * @version      : 1.0.0 (Royal Edition)                                                          //
// * @author       : Hansaka                                                                        //
// * @description  : A Masterpiece of WhatsApp Automation. Elegance meets Intelligence.               //
// * //
// * ♱ Base Crafted By: Hansaka                                                                     //
// * ♱ GitHub         : @Hansaka-Dev                                                                //
// * ♱ WhatsApp       : 94779912589                                                      //
// * //
// * "Rule your digital world with unmatched precision and a touch of class."                       //
// * © 2026 𝚀𝚄𝙴𝙴𝙽 𝚅𝙴𝙽𝚄𝚂 𝙼𝙳. All Rights Reserved.                                                    //
// ✦•·····························································································•✦ //

const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "QUEEN VENUS =eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0ZmMnIyOXFoRUY4TUVMY1VsQml0N05pTDRnd05OWkgvSkdYRU9Bc1FuOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0o5MnhXWnRRTmI1OTFYVXcvNnBkMFRrdHJlaFJtMlVURHEwTk8zQkd4TT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5SjJ6OWk2TFoycE5oRXBEMEo2Smg2Y1pEc1VhSi8vMFVtMzZzUElIWVdNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4VFZrVExlTEYxSGZIYWg4cWVLVmQyQXpsbzZ4bXoyQjU0VlE1eHkremlvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdKMEgzZitjOHJwa3VqVWgrMU4yTlFrWWxXeXNZdkxadjNtNVNiQk5TRjA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFDOEZDT0U5ZUVybjJkMFNEdUNOUTErWURkcksydisrelpxNG9iV1NLRkU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZU1ad2VJaER2aFBSQ2NyS05mM0FJT0l5bDArUVhPTHhlTytSNWNwRWRWVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiellPOU1HMVVtR2ZMUEwxQmZYUEljWGZ4N0hxZjk0SDNOYlA3WWZPVUZSYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBRZ29NbXJVUWVpMStCRUFtVDZBUm10UGdBZ2UvK3ZzbW01MDdvZFdGZ1htNlBYc01iMi9LdlBqTkJ6SENvS3krR2p0dFNLeTZBUDFoT0xLR2RXc2pRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc2LCJhZHZTZWNyZXRLZXkiOiJmS3NyRzZzWmgwOGJVYkRGNDB3SWRDNXU5S2F4cERFZHZvUWtMSVkxa3ZNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6ODEzLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6ODEzLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkhTNkMxS0dCIiwibWUiOnsiaWQiOiI5NDc0MjA1MzA4MDozMUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZeU8J2XnCDwnZeU8J2YgPCdmIDwnZe28J2YgPCdmIHwnZeu8J2Xu/CdmIEg8J2XovCdl7nwnZiG8J2XriIsImxpZCI6IjI3MzUwODQ0OTkyMzE3MjozMUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pXNjNzd0ZFTy9obmM0R0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlloSWVXYXRpakZLcGE1QlhqZmFCQ2haenJnb3d1L1N4d2VWVitxajNPMW89IiwiYWNjb3VudFNpZ25hdHVyZSI6Ikt6ellhOG1KUVR5dVV3Q0JOcEtKMDQ0WWRmR0gwZDdYMDBkUU11aEcvSkgwWWF6bFMveC9CYzFyazB1ZGU2cUYrTmtZQjV1Tk0waEVST0cydURPVkFnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJZdVlMUWkybU02U2N5bE1PU2NHdHdYQ0JBNDR2MHQ0STJpS3c1Zy9hYzBHYk04VUNBRFlUT1FBK3ptU3BaNTJUNzlWcHkxYXBpRnNuL2xRMFo2bVVqZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI3MzUwODQ0OTkyMzE3MjozMUBsaWQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV0lTSGxtcllveFNxV3VRVjQzMmdRb1djNjRLTUx2MHNjSGxWZnFvOXp0YSJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUNBZ0MifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzc0Njc4MjY4LCJsYXN0UHJvcEhhc2giOiIzbWwxalMiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUdYaCJ9",
PORT: process.env.PORT || "8000"
};
