import * as mc from "@minecraft/server"
import { teamsb, Bangruende, checkplonline } from "../main.js"
import { ActionFormData, ActionFormResponse, FormResponse, MessageFormData, MessageFormResponse, ModalFormData, ModalFormResponse } from "@minecraft/server-ui"
import { bannendlist } from "../data/banliste.js"
import { enchantmentlist, enchantmentlistlevel } from "../data/enchantments.js"
import { anti_32k_bypass, ingamebanbypass } from "../data/bypass.js"
import { number } from "../data/numberdata.js" 
import { dhm } from "../data/time.js"



export function isBanned(playerName) {
    let bannedPlayerArray = []
    for (const bannedPlayers of mc.world.scoreboard.getObjective('banPlayerArray').getParticipants()) {
        if (bannedPlayers.displayName.startsWith('/')) {
            bannedPlayerArray.push(bannedPlayers.displayName)

        }
        else {
            9
            mc.world.sendMessage("gu")
        }
    }
    if (bannedPlayerArray.includes('/' + playerName)) return true
    else if (bannedPlayerArray.includes('/' + playerName + ' permanently')) return true
    else return false
}

export function unbanPlayer(player, unBanPlayerName, menu) {
    mc.world.getDimension(`overworld`).getPlayers()
    let unbanPlayer = new MessageFormData();
    let replace = unBanPlayerName.replace('/', '')
    unbanPlayer.title('§l§cUnBan §4' + replace);
    unbanPlayer.body("§c§lDo you want to un Ban §4" + replace + '§c ?');
    unbanPlayer.button1("§  §cNo");
    unbanPlayer.button2("§aYes");
    unbanPlayer.show(player).then(r => {
        // ".isCanceled" is not working, but return 0 to ".selection"
        if (r.selection === 0) {
            if (menu == 'search') {
                searchByName(player)
            }
            if (menu == 'main') {
                unBanPlayerForm(player)
            }
        };
        if (r.selection === 1) {
            let replace = unBanPlayerName.replace('', '/')
            mc.world.getDimension("overworld").runCommandAsync(`scoreboard players reset "${unBanPlayerName}" banPlayerArray`)
        };
    })
}

export function banPlayer(player) {

        const pl = (player)
        const team = teamsb(pl)
            if (team == 0 || team == 1 || team == 2 || team == 20) {
                const adminPlayer = pl

                let allPlayers = [];
                allPlayers = mc.world.getAllPlayers().map(player => player = player.name)

                const admin_form = new ModalFormData()
                let playerName = String(adminPlayer.name)
                let player = adminPlayer
                const n = "\n"
                admin_form.title({ translate: `admin_form.title` })// ban menü
                admin_form.dropdown({ translate: `admin_form.dropdown`, with: [n, n] }, allPlayers, 0) //`\n§c§lPlayer : \n `
                admin_form.slider({ translate: `admin_form.slider1`, with: [n, n, n] }, 0, 60, 1, 0)//\n§c§lBan §4Time :\n\n§c§lDays §7
                admin_form.slider({ translate: `admin_form.slider2`, with: [n, n] }, 0, 23, 1, 0)//§c§lHours §7
                admin_form.slider({ translate: `admin_form.slider3`, with: [n, n] }, 0, 59, 1, 0)//§c§lMinutes §7
                admin_form.slider({ translate: `admin_form.slider4`, with: [n, n] }, 0, 59, 1, 0)//§c§lSecondes §7
                admin_form.toggle({ translate: `admin_form.toggle`, with: [n, n] }, false)//§4§lPermanently
                admin_form.textField({ translate: `admin_form.textFlield`, with: [n, n] }, "§oBan Reason", "Cheating")//"\n§c§lBan Reason §7: \n", "§oBan Reason", "Cheating"





                admin_form.show(adminPlayer).then(r => {

                    let banTimeSecondes = r.formValues[4]
                    let banTimeMinutes = r.formValues[3]
                    let banTimeHours = r.formValues[2]
                    let banTimeDays = r.formValues[1]
                    let bannedPlayer = allPlayers[r.formValues[0]]
                    let banMessage = r.formValues[6]

                    // This will stop the code when player close the form
                    let banPanel = r.formValues
                    if (team == 1){
                        if (r.formValues[5] === true) {
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add banDef`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banReason:${banMessage}"`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banBy:${playerName}"`)
                            mc.world.getDimension('overworld').runCommandAsync(`tellraw @a {\"rawtext\":[{\"text\":\"§l§c${playerName}§r§c banned §4${bannedPlayer}\n§cCauses §7: ${banMessage}\n§cTime §7: Permanently.\"}]}`)
                            mc.world.getDimension("overworld").runCommandAsync(`scoreboard players set "/${bannedPlayer} permanently" banPlayerArray 1`)
                            mc.world.getDimension("overworld").runCommandAsync(`scoreboard players add "/${bannedPlayer} permanently" banPlayerArraytime 1`)
                            mc.world.getDimension('overworld').runCommandAsync(`kick "${bannedPlayer}" "\n§l§c${playerName}§r§c banned you ! \n§cCauses §7: ${banMessage}\n§cTime §7: Permanently.\""`)
                            console.log(`user ${bannedPlayer} was banned by ${playerName} because of ${banMessage} bantime Permanently`)
                        }
                        else {
                            let allBanTime = (banTimeSecondes + (banTimeMinutes * 60) + (banTimeHours * 60 * 60) + (banTimeDays * 24 * 60 * 60)) * 1000
                            let deBan = (Date.now() + (allBanTime))
                            // This will give every input as their own variable
                            mc.world.getDimension('overworld').runCommandAsync(`tellraw @a {\"rawtext\":[{\"text\":\"§l§c${playerName}§r§c banned §4${bannedPlayer}\n§cCauses §7: ${banMessage}\n§cTime §7: ${banTimeDays} Day(s) ${banTimeHours} hour(s) ${banTimeMinutes} Minute(s) ${banTimeSecondes} Seconde(s).\"}]}`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add ban`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banReason:${banMessage}"`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banBy:${playerName}"`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "deBanDate:${deBan}"`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banAllBanTime:${allBanTime}"`)
                            mc.world.getDimension("overworld").runCommandAsync(`scoreboard players set "/${bannedPlayer}" banPlayerArray 1`)
                            mc.world.getDimension('overworld').runCommandAsync(`kick "${bannedPlayer}" "\n§l§c${playerName}§r§c banned you ! \n§cCauses §7: ${banMessage}\n§cTime §7: ${banTimeDays} Day(s) ${banTimeHours} hour(s) ${banTimeMinutes} Minute(s) ${banTimeSecondes} Seconde(s)."`)
                            console.log(`user ${bannedPlayer} was banned by ${playerName} with the team sb id ${team} because of ${banMessage} for a time of ${banTimeDays} days ${banTimeHours} houers ${banTimeMinutes} minutes ${banTimeSecondes} seconds`)
                    }
                }
                else if (team == 2 && team == 20){
                    if (r.formValues[5] === true) {
                        mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add banDef`)
                        mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banReason:${banMessage}"`)
                        mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banBy:${playerName}"`)
                        mc.world.getDimension('overworld').runCommandAsync(`tellraw @a {\"rawtext\":[{\"text\":\"§l§c${playerName}§r§c banned §4${bannedPlayer}\n§cCauses §7: ${banMessage}\n§cTime §7: Permanently.\"}]}`)
                        mc.world.getDimension("overworld").runCommandAsync(`scoreboard players set "/${bannedPlayer} permanently" banPlayerArray 2`)
                        mc.world.getDimension("overworld").runCommandAsync(`scoreboard players add "/${bannedPlayer} permanently" banPlayerArraytime 1`)
                        mc.world.getDimension('overworld').runCommandAsync(`kick "${bannedPlayer}" "\n§l§c${playerName}§r§c banned you ! \n§cCauses §7: ${banMessage}\n§cTime §7: Permanently.\""`)
                        console.log(`user ${bannedPlayer} was banned by ${playerName} because of ${banMessage} bantime Permanently`)
                    }
                    else {
                        let allBanTime = (banTimeSecondes + (banTimeMinutes * 60) + (banTimeHours * 60 * 60) + (banTimeDays * 24 * 60 * 60)) * 1000
                        let deBan = (Date.now() + (allBanTime))
                        // This will give every input as their own variable
                        mc.world.getDimension('overworld').runCommandAsync(`tellraw @a {\"rawtext\":[{\"text\":\"§l§c${playerName}§r§c banned §4${bannedPlayer}\n§cCauses §7: ${banMessage}\n§cTime §7: ${banTimeDays} Day(s) ${banTimeHours} hour(s) ${banTimeMinutes} Minute(s) ${banTimeSecondes} Seconde(s).\"}]}`)
                        mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add ban`)
                        mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banReason:${banMessage}"`)
                        mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banBy:${playerName}"`)
                        mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "deBanDate:${deBan}"`)
                        mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banAllBanTime:${allBanTime}"`)
                        mc.world.getDimension("overworld").runCommandAsync(`scoreboard players set "/${bannedPlayer}" banPlayerArray 2`)
                        mc.world.getDimension('overworld').runCommandAsync(`kick "${bannedPlayer}" "\n§l§c${playerName}§r§c banned you ! \n§cCauses §7: ${banMessage}\n§cTime §7: ${banTimeDays} Day(s) ${banTimeHours} hour(s) ${banTimeMinutes} Minute(s) ${banTimeSecondes} Seconde(s)."`)
                        console.log(`user ${bannedPlayer} was banned by ${playerName} with the team sb id ${team} because of ${banMessage} for a time of ${banTimeDays} days ${banTimeHours} houers ${banTimeMinutes} minutes ${banTimeSecondes} seconds`)
                }
            }

                })
            }
            else if (team == 21 || team >= 30 && team <= 39) {
                if (team == 21) {

                    const adminPlayer = pl

                    let allPlayers = [];
                    allPlayers = mc.world.getAllPlayers().map(player => player = player.name)

                    const admin_form = new ModalFormData()
                    let playerName = String(adminPlayer.name)
                    let player = adminPlayer
                    const n = "\n"
                    admin_form.title({ translate: `admin_form.title` })// ban menü
                    admin_form.dropdown({ translate: `admin_form.dropdown`, with: [n, n] }, allPlayers, 0) //`\n§c§lPlayer : \n `
                    admin_form.slider({ translate: `admin_form.slider1`, with: [n, n, n] }, 0, 60, 1, 0)//\n§c§lBan §4Time :\n\n§c§lDays §7
                    admin_form.slider({ translate: `admin_form.slider2`, with: [n, n] }, 0, 23, 1, 0)//§c§lHours §7
                    admin_form.slider({ translate: `admin_form.slider3`, with: [n, n] }, 0, 59, 1, 0)//§c§lMinutes §7
                    admin_form.slider({ translate: `admin_form.slider4`, with: [n, n] }, 0, 59, 1, 0)//§c§lSecondes §7
                    admin_form.textField({ translate: `admin_form.textFlield`, with: [n, n] }, "§oBan Reason", "Cheating")//"\n§c§lBan Reason §7: \n", "§oBan Reason", "Cheating"

                    admin_form.show(adminPlayer).then(r => {

                        let banTimeSecondes = r.formValues[4]
                        let banTimeMinutes = r.formValues[3]
                        let banTimeHours = r.formValues[2]
                        let banTimeDays = r.formValues[1]
                        let bannedPlayer = allPlayers[r.formValues[0]]
                        let banMessage = r.formValues[5]

                        // This will stop the code when player close the form
                        let banPanel = r.formValues

                        let allBanTime = (banTimeSecondes + (banTimeMinutes * 60) + (banTimeHours * 60 * 60) + (banTimeDays * 24 * 60 * 60)) * 1000
                        let deBan = (Date.now() + (allBanTime))
                        // This will give every input as their own variable
                        mc.world.getDimension('overworld').runCommandAsync(`tellraw @a {\"rawtext\":[{\"text\":\"§l§c${playerName}§r§c banned §4${bannedPlayer}\n§cCauses §7: ${banMessage}\n§cTime §7: ${banTimeDays} Day(s) ${banTimeHours} hour(s) ${banTimeMinutes} Minute(s) ${banTimeSecondes} Seconde(s).\"}]}`)
                        mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add ban`)
                        mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banReason:${banMessage}"`)
                        mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banBy:${playerName}"`)
                        mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "deBanDate:${deBan}"`)
                        mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banAllBanTime:${allBanTime}"`)
                        mc.world.getDimension("overworld").runCommandAsync(`scoreboard players set "/${bannedPlayer}" banPlayerArray 3`)
                        mc.world.getDimension('overworld').runCommandAsync(`kick "${bannedPlayer}" "\n§l§c${playerName}§r§c banned you ! \n§cCauses §7: ${banMessage}\n§cTime §7: ${banTimeDays} Day(s) ${banTimeHours} hour(s) ${banTimeMinutes} Minute(s) ${banTimeSecondes} Seconde(s)."`)
                        console.log(`user ${bannedPlayer} was banned by ${playerName} with the team sb id ${team} because of ${banMessage} for a time of ${banTimeDays} days ${banTimeHours} houers ${banTimeMinutes} minutes ${banTimeSecondes} seconds`)
                    })
                }
                else if (team >= 30 && team <= 40) {
                    if (team == 31) {

                        const adminPlayer = pl

                        let allPlayers = [];
                        allPlayers = mc.world.getAllPlayers().map(player => player = player.name)

                        const admin_form = new ModalFormData()
                        let playerName = String(adminPlayer.name)
                        let player = adminPlayer
                        const n = "\n"
                        admin_form.title({ translate: `admin_form.title` })// ban menü
                        admin_form.dropdown({ translate: `admin_form.dropdown`, with: [n, n] }, allPlayers, 0) //`\n§c§lPlayer : \n `
                        admin_form.slider({ translate: `admin_form.slider1`, with: [n, n, n] }, 0, 30, 1, 0)//\n§c§lBan §4Time :\n\n§c§lDays §7
                        admin_form.slider({ translate: `admin_form.slider2`, with: [n, n] }, 0, 23, 1, 0)//§c§lHours §7
                        admin_form.slider({ translate: `admin_form.slider3`, with: [n, n] }, 0, 59, 1, 0)//§c§lMinutes §7
                        admin_form.slider({ translate: `admin_form.slider4`, with: [n, n] }, 0, 59, 1, 0)//§c§lSecondes §7
                        admin_form.textField({ translate: `admin_form.textFlield`, with: [n, n] }, "§oBan Reason", "Cheating")//"\n§c§lBan Reason §7: \n", "§oBan Reason", "Cheating"

                        admin_form.show(adminPlayer).then(r => {

                            let banTimeSecondes = r.formValues[4]
                            let banTimeMinutes = r.formValues[3]
                            let banTimeHours = r.formValues[2]
                            let banTimeDays = r.formValues[1]
                            let bannedPlayer = allPlayers[r.formValues[0]]
                            let banMessage = r.formValues[5]

                            // This will stop the code when player close the form
                            let banPanel = r.formValues

                            let allBanTime = (banTimeSecondes + (banTimeMinutes * 60) + (banTimeHours * 60 * 60) + (banTimeDays * 24 * 60 * 60)) * 1000
                            let deBan = (Date.now() + (allBanTime))
                            // This will give every input as their own variable
                            mc.world.getDimension('overworld').runCommandAsync(`tellraw @a {\"rawtext\":[{\"text\":\"§l§c${playerName}§r§c banned §4${bannedPlayer}\n§cCauses §7: ${banMessage}\n§cTime §7: ${banTimeDays} Day(s) ${banTimeHours} hour(s) ${banTimeMinutes} Minute(s) ${banTimeSecondes} Seconde(s).\"}]}`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add ban`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banReason:${banMessage}"`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banBy:${playerName}"`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "deBanDate:${deBan}"`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banAllBanTime:${allBanTime}"`)
                            mc.world.getDimension("overworld").runCommandAsync(`scoreboard players set "/${bannedPlayer}" banPlayerArray 3`)
                            mc.world.getDimension('overworld').runCommandAsync(`kick "${bannedPlayer}" "\n§l§c${playerName}§r§c banned you ! \n§cCauses §7: ${banMessage}\n§cTime §7: ${banTimeDays} Day(s) ${banTimeHours} hour(s) ${banTimeMinutes} Minute(s) ${banTimeSecondes} Seconde(s)."`)
                            console.log(`user ${bannedPlayer} was banned by ${playerName} with the team sb id ${team} because of ${banMessage} for a time of ${banTimeDays} days ${banTimeHours} houers ${banTimeMinutes} minutes ${banTimeSecondes} seconds`)
                        })

                    }
                    else if (team == 32) {

                        const adminPlayer = pl

                        let allPlayers = [];
                        allPlayers = mc.world.getAllPlayers().map(player => player = player.name)

                        const admin_form = new ModalFormData()
                        let playerName = String(adminPlayer.name)
                        let player = adminPlayer
                        const n = "\n"
                        admin_form.title({ translate: `admin_form.title` })// ban menü
                        admin_form.dropdown({ translate: `admin_form.dropdown`, with: [n, n] } , allPlayers, 0) //`\n§c§lPlayer : \n `
                        admin_form.slider({ translate: `admin_form.slider1`, with: [n, n, n] }, 0, 3, 1, 0)//\n§c§lBan §4Time :\n\n§c§lDays §7
                        admin_form.slider({ translate: `admin_form.slider2`, with: [n, n] }, 0, 23, 1, 0)//§c§lHours §7
                        admin_form.slider({ translate: `admin_form.slider3`, with: [n, n] }, 0, 59, 1, 0)//§c§lMinutes §7
                        admin_form.slider({ translate: `admin_form.slider4`, with: [n, n] }, 0, 59, 1, 0)//§c§lSecondes §7
                        admin_form.textField({ translate: `admin_form.textFlield`, with: [n, n] }, "§oBan Reason", "Sicherheitsban ")//"\n§c§lBan Reason §7: \n", "§oBan Reason", "Cheating"

                        admin_form.show(adminPlayer).then(r => {

                            let banTimeSecondes = r.formValues[4]
                            let banTimeMinutes = r.formValues[3]
                            let banTimeHours = r.formValues[2]
                            let banTimeDays = r.formValues[1]
                            let bannedPlayer = allPlayers[r.formValues[0]]
                            let banMessage = r.formValues[5]

                            // This will stop the code when player close the form
                            let banPanel = r.formValues

                            let allBanTime = (banTimeSecondes + (banTimeMinutes * 60) + (banTimeHours * 60 * 60) + (banTimeDays * 24 * 60 * 60)) * 1000
                            let deBan = (Date.now() + (allBanTime))
                            // This will give every input as their own variable
                            mc.world.getDimension('overworld').runCommandAsync(`tellraw @a {\"rawtext\":[{\"text\":\"§l§c${playerName}§r§c banned §4${bannedPlayer}\n§cCauses §7: ${banMessage}\n§cTime §7: ${banTimeDays} Day(s) ${banTimeHours} hour(s) ${banTimeMinutes} Minute(s) ${banTimeSecondes} Seconde(s).\"}]}`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add ban`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banReason:${banMessage}"`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banBy:${playerName}"`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "deBanDate:${deBan}"`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banAllBanTime:${allBanTime}"`)
                            mc.world.getDimension("overworld").runCommandAsync(`scoreboard players set "/${bannedPlayer}" banPlayerArray 3`)
                            mc.world.getDimension('overworld').runCommandAsync(`kick "${bannedPlayer}" "\n§l§c${playerName}§r§c banned you ! \n§cCauses §7: ${banMessage}\n§cTime §7: ${banTimeDays} Day(s) ${banTimeHours} hour(s) ${banTimeMinutes} Minute(s) ${banTimeSecondes} Seconde(s)."`)
                            console.log(`user ${bannedPlayer} was banned by ${playerName} with the team sb id ${team} because of ${banMessage} for a time of ${banTimeDays} days ${banTimeHours} houers ${banTimeMinutes} minutes ${banTimeSecondes} seconds`)
                        })
                    }
                }

            }
            else { pl.sendMessage(`§4§l§oDu hast keine Rechte für diesen befehl`) }
}


export function searchByName(player) {

    const serachByNameForm = new ModalFormData()
    serachByNameForm.title(`§cSearch §4Player§c Panel`)
    serachByNameForm.textField("\n§cSearch player By §4Name§c : \n", "§oPlayer Name")
    serachByNameForm.show(player).then(r => {
        let playerSearched = r.formValues[0]

        // This will stop the code when player close the form
        if (r.isCanceled) return mc.world.getDimension('overworld').runCommandAsync(`tellraw "${player.name}" {"rawtext":[{"text":"§7[§4BanPlugin§7] §cMenu Closed !"}]}`);
        let unBanMenu = new ActionFormData()
        unBanMenu.title(`§cSearch §4Player§c Panel`)
        unBanMenu.body(`§cBanned players search with ' §8${playerSearched}§c ' : `)
        let bannedPlayerNumbers = []
        let bannedPlayerName = []
        let getBannedPlayer = mc.world.scoreboard.getObjective('banPlayerArray').getParticipants()
        getBannedPlayer.forEach(function (element) {
            if (element.displayName.includes('/') && element.displayName.includes(playerSearched)) {
                if (element.displayName.includes("permanently")) {
                    let playerName = element.displayName.replace('/', '')
                    playerName = playerName.replace(" permanently", "")
                    unBanMenu.button(playerName)
                    bannedPlayerName.push(element.displayName)
                    
                    
                    
                    
                    
                    
                }
                else {
                    let playerName = element.displayName.replace('/', '')
                    unBanMenu.button(playerName)
                    bannedPlayerName.push(element.displayName)
                    bannedPlayerNumbers++
                }

            }
        })
        unBanMenu.button("§c§lBack")
        unBanMenu.show(player).then(r => {
            let respond = r.selection

            // This will stop the code when player close the form
            if (r.isCanceled) return mc.world.getDimension('overworld').runCommandAsync(`tellraw "${player.name}" {"rawtext":[{"text":"§7[§4BanPlugin§7] §cMenu Closed !"}]}`);
            let back = bannedPlayerNumbers
            let UnbanPlayer = bannedPlayerName[respond]
            if (respond == back) {
                searchByName(player)
            }
            if (respond < back) {
                let banscore = mc.world.scoreboard.getObjective('banPlayerArray').getScore(`${UnbanPlayer}`)
                switch (banscore) {
                    case 1:
                        if (teamsb(player) == 1 || teamsb(player) == 0){
                            unbanPlayer(player, UnbanPlayer, 'main')
                        }
                        else {mc.world.sendMessage("Du hast dazu keine rechte")}
                        break
                    case 2:
                        if (teamsb(player) == 0 ||teamsb(player) == 1 || teamsb(player) == 2 || teamsb(player) == 20){
                            unbanPlayer(player, UnbanPlayer, 'main')
                        }
                        else {mc.world.sendMessage("Du hast dabei keine rechte")}
                        break
                    case 3:
                        if (teamsb(player) == 0 ||teamsb(player) == 1 || teamsb(player) == 2 || teamsb(player) == 20 || teamsb(player) == 31){
                            unbanPlayer(player, UnbanPlayer, 'main')
                        }
                        else {mc.world.sendMessage("Du hast dabei keine rechte")}
                        break
                }
            }
            // Do something
        })
    })
}

export function unBanPlayerForm(pl) {
        const team = teamsb(pl)
        if (team == 0 ||team == 1 || team == 2 || team == 20 || team == 31){
            const player = pl
            let unBanMenu = new ActionFormData()
            unBanMenu.title(`§c§lUnBan §4Menu`)
            unBanMenu.button("§c§lSearch By §4Name")
            unBanMenu.body(`§cBanned Players : `)
            let bannedPlayerNumbers = []
            let bannedPlayerName = []
            let getBannedPlayer = mc.world.scoreboard.getObjective('banPlayerArray').getParticipants()
            getBannedPlayer.forEach(function (element) {
                if (element.displayName.includes('/')) {
                    let playerName = element.displayName.replace('/', '')
                    unBanMenu.button(playerName)
                    bannedPlayerName.push(element.displayName)
                    bannedPlayerNumbers++
                }
            })
            unBanMenu.button("§c§lReload")
            unBanMenu.button("§c§lExit §4Menu")
            unBanMenu.show(player).then(r => {
                let respond = r.selection

                // This will stop the code when player close the form
                if (r.isCanceled) return mc.world.getDimension('overworld').runCommandAsync(`tellraw "${player.name}" {"rawtext":[{"text":"§7[§4BanPlugin§7] §cMenu Closed !"}]}`);
                let back = bannedPlayerNumbers + 2
                let reaload = bannedPlayerNumbers + 1
                let UnbanPlayer = bannedPlayerName[respond - 1]

                if (respond == 0) {
                    searchByName(player)
                }
                if (respond == back) {
                }
                if (respond == reaload) {
                    unBanPlayerForm(player)
                }
                if (respond < reaload && respond >= 1) {
                    let banscore = mc.world.scoreboard.getObjective('banPlayerArray').getScore(`${UnbanPlayer}`)
                    switch (banscore) {
                        case 1:
                            if (teamsb(player) == 1, teamsb(player) == 0){
                                unbanPlayer(player, UnbanPlayer, 'main')
                            }
                            else {mc.world.sendMessage("Du hast dazu keine rechte")}
                            break
                        case 2:
                            if (teamsb(player) == 0 ||teamsb(player) == 1 || teamsb(player) == 2 || teamsb(player) == 20){
                                unbanPlayer(player, UnbanPlayer, 'main')
                            }
                            else {mc.world.sendMessage("Du hast dabei keine rechte")}
                            break
                        case 3:
                            if (teamsb(player) == 0 ||teamsb(player) == 1 || teamsb(player) == 2 || teamsb(player) == 20 || teamsb(player) == 31){
                                unbanPlayer(player, UnbanPlayer, 'main')
                            }
                            else {mc.world.sendMessage("Du hast dabei keine rechte")}
                            break
                    }
                }
            })
        }
}
export function ingamebannen(message, plname){
    
        let bannedPlayer = plname
        let playerName = "System"
        let banMessage = message
        
        
        mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add banDef`)
        mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banReason:${banMessage}"`)
        mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banBy:${playerName}"`)
        mc.world.getDimension('overworld').runCommandAsync(`tellraw @a {\"rawtext\":[{\"text\":\"§l§c${playerName}§r§c banned §4${bannedPlayer}\n§cCauses §7: ${banMessage}\n§cTime §7: Permanently.\"}]}`)
        mc.world.getDimension("overworld").runCommandAsync(`scoreboard players set "/${bannedPlayer} permanently" banPlayerArray 1`)
        mc.world.getDimension("overworld").runCommandAsync(`scoreboard players add "/${bannedPlayer} permanently" banPlayerArraytime 1`)
        mc.world.getDimension('overworld').runCommandAsync(`kick "${bannedPlayer}" "\n§l§c${playerName}§r§c banned you ! \n§cCauses §7: ${banMessage}\n§cTime §7: Permanently.\""`)
        console.log(`user ${bannedPlayer} was banned by ${playerName} because of ${banMessage} bantime Permanently`)

        

}

export function autoban(pl){ 
    if (pl == undefined) return
    if (pl.name == "WiredWolf445347") return


    let inv = pl.getComponent('inventory').container
    
    
    
    for (let i = 0; i <= 35; i++) {
        let invitems_name = "Kein item verfügbar"
        let invitems = inv.getItem(i)
        if (invitems === undefined){
            invitems_name = "Kein item verfügbar!"
        }
        else {
            if (invitems.hasComponent('enchantable') == false ) {
                if(invitems.amount > invitems.maxAmount){
                let bannedPlayer = pl.name
                let playerName = "System"
                let banMessage = `${invitems.typeId} ${invitems.amount} Stack `
    
                mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add banDef`)
                mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banReason:${banMessage}"`)
                mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banBy:${playerName}"`)
                mc.world.getDimension('overworld').runCommandAsync(`tellraw @a {\"rawtext\":[{\"text\":\"§l§c${playerName}§r§c banned §4${bannedPlayer}\n§cCauses §7: ${banMessage}\n§cTime §7: Permanently.\"}]}`)
                mc.world.getDimension("overworld").runCommandAsync(`scoreboard players set "/${bannedPlayer} permanently" banPlayerArray 1`)
                mc.world.getDimension("overworld").runCommandAsync(`scoreboard players add "/${bannedPlayer} permanently" banPlayerArraytime 1`)
                mc.world.getDimension('overworld').runCommandAsync(`kick "${bannedPlayer}" "\n§l§c${playerName}§r§c banned you ! \n§cCauses §7: ${banMessage}\n§cTime §7: Permanently.\""`)
                console.log(`user ${bannedPlayer} was banned by ${playerName} because of ${banMessage} bantime Permanently`)
                }else{
                    invitems_name = invitems.typeId
                    let i_amount = invitems.amount
                    let invitem = new mc.ItemStack(invitems_name, i_amount)
                    inv.setItem(i, invitem)
            }

        }else{
            invitems.getComponent('enchantable').getEnchantments().forEach((en) => {
                if (en.level > en.type.maxLevel) {  
                    let bannedPlayer = pl.name
                    let playerName = "System"
                    let banMessage = `${en.type.id} ${en.level} Stufe`
                    mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add banDef`)
                    mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banReason:${banMessage}"`)
                    mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banBy:${playerName}"`)
                    mc.world.getDimension('overworld').runCommandAsync(`tellraw @a {\"rawtext\":[{\"text\":\"§l§c${playerName}§r§c banned §4${bannedPlayer}\n§cCauses §7: ${banMessage}\n§cTime §7: Permanently.\"}]}`)
                    mc.world.getDimension("overworld").runCommandAsync(`scoreboard players set "/${bannedPlayer} permanently" banPlayerArray 1`)
                    mc.world.getDimension("overworld").runCommandAsync(`scoreboard players add "/${bannedPlayer} permanently" banPlayerArraytime 1`)
                    mc.world.getDimension('overworld').runCommandAsync(`kick "${bannedPlayer}" "\n§l§c${playerName}§r§c banned you ! \n§cCauses §7: ${banMessage}\n§cTime §7: Permanently.\""`)
                    console.log(`user ${bannedPlayer} was banned by ${playerName} because of ${banMessage} bantime Permanently`)
                }
            })

    }
}
}
}


export function banlistban(player){
    if (player == undefined) return
    let bannendlist1 = bannendlist()
    bannendlist1.forEach((element) => {

        let splitted = element.split(";")



        let p = splitted[0].replace("pl:" , "")
        let banMessage = splitted[1].replace("bg:", "")
        
        
        

        let playerName = "system"


        if (p === player.name){
            let bannedPlayer = p
            mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add banDef`)
            mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banReason:${banMessage}"`)
            mc.world.getDimension('overworld').runCommandAsync(`tag "${bannedPlayer}" add "banBy:${playerName}"`)
            mc.world.getDimension('overworld').runCommandAsync(`tellraw @a {\"rawtext\":[{\"text\":\"§l§c${playerName}§r§c banned §4${bannedPlayer}\n§cCauses §7: ${banMessage}\n§cTime §7: Permanently.\"}]}`)
            mc.world.getDimension("overworld").runCommandAsync(`scoreboard players set "/${bannedPlayer} permanently" banPlayerArray 1`)
            mc.world.getDimension("overworld").runCommandAsync(`scoreboard players add "/${bannedPlayer} permanently" banPlayerArraytime 1`)
            mc.world.getDimension('overworld').runCommandAsync(`kick "${bannedPlayer}" "\n§l§c${playerName}§r§c banned you ! \n§cCauses §7: ${banMessage}\n§cTime §7: Permanently.\""`)
            console.log(`user ${bannedPlayer} was banned by ${playerName} because of ${banMessage} bantime Permanently`)
        }
        else {
            return
        }
    });
}

export function onspawnban(data){
    if (data.player.hasTag('ban')) {
        let player = data.player
        let playerName = data.player.name
        let allBanTimeTag = data.player.getTags().find((tag) => tag.startsWith("banAllBanTime:"))?.substring(14) ?? null;
        allBanTimeTag.substring(0, (allBanTimeTag.length - 1))
        let banDate = data.player.getTags().find((tag) => tag.startsWith("banDate:"))?.substring(8) ?? null;
        let banBy = data.player.getTags().find((tag) => tag.startsWith("banBy:"))?.substring(6) ?? null;
        let banMessage = data.player.getTags().find((tag) => tag.startsWith("banReason:"))?.substring(10) ?? null;
        let deBanTime = data.player.getTags().find((tag) => tag.startsWith("deBanDate:"))?.substring(10) ?? null;
        let length = deBanTime.length
        length - 1
        deBanTime = deBanTime.substring(0, length)

        let remainBanTime = (deBanTime - Date.now())

        remainBanTime = dhm(remainBanTime)
        if (!isBanned(data.player.name)) {
            let i = 0
            if (data.player.hasTag('ban')) {
                let i = 0
                for (i = 0; i < 4; i++) {
                    let playerTag = data.player.getTags()
                    let tag = playerTag.find((tag) => tag.startsWith("ban")) ?? null;
                    data.player.removeTag(tag)
                }
                for (i = 0; i < 4; i++) {
                    let playerTag = data.player.getTags()
                    let tag = playerTag.find((tag) => tag.startsWith("deBan")) ?? null;
                    data.player.removeTag(tag)
                }
            }
        }
        if (Date.now() >= deBanTime) {
            mc.world.getDimension("overworld").runCommandAsync(`scoreboard players reset "/${data.player.name}" banPlayerArray`)
            let i = 0
            if (data.player.hasTag('ban')) {
                let i = 0
                for (i = 0; i < 4; i++) {
                    let playerTag = data.player.getTags()
                    let tag = playerTag.find((tag) => tag.startsWith("ban")) ?? null;
                    data.player.removeTag(tag)
                }
                for (i = 0; i < 4; i++) {
                    let playerTag = data.player.getTags()
                    let tag = playerTag.find((tag) => tag.startsWith("deBan")) ?? null;
                    data.player.removeTag(tag)
                }
            }
        }
        else {
            mc.world.getDimension('overworld').runCommandAsync(`kick "${data.player.name}" "\n§cYou have been banned by §4${banBy}§c ! \n§cCauses §7: ${banMessage}\n§cTime §7: ${[0]} Day(s) ${remainBanTime[1]} Hour(s) ${remainBanTime[2]} Minute(s) ${remainBanTime[3]} Seconde(s)."`)
        }
    }
    else if (data.player.hasTag('banDef')) {
        if (!isBanned(data.player.name)) {
            data.player.removeTag('banDef')
            let i
            for (i = 0; i < 2; i++) {
                let playerTag = data.player.getTags()
                let tag = playerTag.find((tag) => tag.startsWith("ban")) ?? null;
                data.player.removeTag(tag)
            }
        } else {
            let banMessage = data.player.getTags().find((tag) => tag.startsWith("banReason:"))?.substring(10) ?? null;
            let banBy = data.player.getTags().find((tag) => tag.startsWith("banBy:"))?.substring(6) ?? null;
            mc.world.getDimension('overworld').runCommandAsync(`kick "${data.player.name}" "\n§cyou have been banned by §4${banBy}§c ! \n§cCauses §7: ${banMessage}\n§cTime §7: Permanently."`)
        }
    }
}