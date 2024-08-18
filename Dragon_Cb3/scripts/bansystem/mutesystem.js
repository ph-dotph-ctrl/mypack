import * as mc from "@minecraft/server"
import { teamsb, Bangruende, checkplonline, get_score } from "../main.js"
import { ActionFormData, ActionFormResponse, FormResponse, MessageFormData, MessageFormResponse, ModalFormData, ModalFormResponse } from "@minecraft/server-ui"
import { bannendlist } from "../data/banliste.js"
import { enchantmentlist, enchantmentlistlevel } from "../data/enchantments.js"
import { anti_32k_bypass, ingamebanbypass } from "../data/bypass.js"
import { number } from "../data/numberdata.js" 
import { dhm } from "../data/time.js"



export function ismute(playerName) {
    let mutePlayerArray = []
    for (const mutePlayers of mc.world.scoreboard.getObjective('mutePlayerArray').getParticipants()) {
        if (mutePlayers.displayName.startsWith('/')) {
            mutePlayerArray.push(mutePlayers.displayName)

        }
        else {
            mc.world.sendMessage("gu")
        }
    }
    if (mutePlayerArray.includes('/' + playerName)) return true
    else if (mutePlayerArray.includes('/' + playerName + ' permanently')) return true
    else return false
}

export function unmutePlayer(player, unmutePlayerName, menu) {
    mc.world.getDimension(`overworld`).getPlayers()
    let unmutePlayer = new MessageFormData();
    let replace = unmutePlayerName.replace('/', '')
    unmutePlayer.title('§l§cUnBan §4' + replace);
    unmutePlayer.body("§c§lDo you want to un Ban §4" + replace + '§c ?');
    unmutePlayer.button1("§  §cNo");
    unmutePlayer.button2("§aYes");
    unmutePlayer.show(player).then(r => {
        // ".isCanceled" is not working, but return 0 to ".selection"
        if (r.selection === 0) {
            if (menu == 'search') {
                searchByName(player)
            }
            if (menu == 'main') {
                unmutePlayerForm(player)
            }
        };
        if (r.selection === 1) {
            let replace = unmutePlayerName.replace('', '/')
            mc.world.getDimension("overworld").runCommandAsync(`scoreboard players reset "${unmutePlayerName}" mutePlayerArray`)
        };
    })
}



export function mutePlayer(player) {

        const pl = (player)
        const team = teamsb(pl)
            if (team == 1 || team == 2) {
                const adminPlayer = pl

                let allPlayers = [];
                allPlayers = mc.world.getAllPlayers().map(player => player = player.name)

                const admin_form2 = new ModalFormData()
                let playerName = String(adminPlayer.name)
                let player = adminPlayer
                const n = "\n"
                admin_form2.title({ translate: `admin_form2.title` })// mute menü
                admin_form2.dropdown({ translate: `admin_form2.dropdown`, with: [n, n] }, allPlayers, 0) //`\n§c§lPlayer : \n `
                admin_form2.slider({ translate: `admin_form2.slider1`, with: [n, n, n] }, 0, 60, 1, 0)//\n§c§lmute §4Time :\n\n§c§lDays §7
                admin_form2.slider({ translate: `admin_form2.slider2`, with: [n, n] }, 0, 23, 1, 0)//§c§lHours §7
                admin_form2.slider({ translate: `admin_form2.slider3`, with: [n, n] }, 0, 59, 1, 0)//§c§lMinutes §7
                admin_form2.slider({ translate: `admin_form2.slider4`, with: [n, n] }, 0, 59, 1, 0)//§c§lSecondes §7
                admin_form2.toggle({ translate: `admin_form2.toggle`, with: [n, n] }, false)//§4§lPermanently
                admin_form2.textField({ translate: `admin_form2.textFlield`, with: [n, n] }, "mute Reason", "spamming")//"\n§c§lmute Reason §7: \n", "§omute Reason", "spamming"





                admin_form2.show(adminPlayer).then(r => {

                    let muteTimeSecondes = r.formValues[4]
                    let muteTimeMinutes = r.formValues[3]
                    let muteTimeHours = r.formValues[2]
                    let muteTimeDays = r.formValues[1]
                    let mutePlayer = allPlayers[r.formValues[0]]
                    let muteMessage = r.formValues[6]

                    // This will stop the code when player close the form
                    let mutePanel = r.formValues
                    if (r.formValues[5] === true) {
                        mc.world.getDimension('overworld').runCommandAsync(`tag "${mutePlayer}" add muteDef`)
                        mc.world.getDimension('overworld').runCommandAsync(`tag "${mutePlayer}" add "muteReason:${muteMessage}"`)
                        mc.world.getDimension('overworld').runCommandAsync(`tag "${mutePlayer}" add "muteBy:${playerName}"`)
                        mc.world.getDimension('overworld').runCommandAsync(`tellraw @a {\"rawtext\":[{\"text\":\"§l§c${playerName}§r§c muted §4${mutePlayer}\n§cCauses §7: ${muteMessage}\n§cTime §7: Permanently.\"}]}`)
                        mc.world.getDimension("overworld").runCommandAsync(`scoreboard players set "/${mutePlayer} permanently" mutePlayerArray 1`)
                        mc.world.getDimension("overworld").runCommandAsync(`scoreboard players set "/${mutePlayer} permanently" mutePlayerArraytime 1`)
                        console.log(`user ${mutePlayer} was muted by ${playerName} because of ${muteMessage} mutetime Permanently`)
                    }
                    else {
                        let allmuteTime = (muteTimeSecondes + (muteTimeMinutes * 60) + (muteTimeHours * 60 * 60) + (muteTimeDays * 24 * 60 * 60)) * 1000
                        mc.world.sendMessage(allmuteTime)
                        mc.world.sendMessage(mutePlayer)
                        mc.world.sendMessage(`${get_score("t", mutePlayer)}`)
                        let demute = (get_score("t", mutePlayer) + (allmuteTime/1000))
                        mc.world.sendMessage(demute)
                        // This will give every input as their own variable
                        mc.world.getDimension('overworld').runCommandAsync(`tellraw @a {\"rawtext\":[{\"text\":\"§l§c${playerName}§r§c muted §4${mutePlayer}\n§cCauses §7: ${muteMessage}\n§cTime §7: ${muteTimeDays} Day(s) ${muteTimeHours} hour(s) ${muteTimeMinutes} Minute(s) ${muteTimeSecondes} Seconde(s).\"}]}`)
                        mc.world.getDimension('overworld').runCommandAsync(`tag "${mutePlayer}" add mute`)
                        mc.world.getDimension('overworld').runCommandAsync(`tag "${mutePlayer}" add "muteReason:${muteMessage}"`)
                        mc.world.getDimension('overworld').runCommandAsync(`tag "${mutePlayer}" add "muteBy:${playerName}"`)
                        mc.world.getDimension('overworld').runCommandAsync(`tag "${mutePlayer}" add "demuteDate:${demute}"`)
                        mc.world.getDimension('overworld').runCommandAsync(`tag "${mutePlayer}" add "muteAllmuteTime:${allmuteTime}"`)
                        mc.world.getDimension("overworld").runCommandAsync(`scoreboard players set "/${mutePlayer}" mutePlayerArray 1`)
                        console.log(`user ${mutePlayer} was muted by ${playerName} with the team sb id ${team} because of ${muteMessage} for a time of ${muteTimeDays} days ${muteTimeHours} houers ${muteTimeMinutes} minutes ${muteTimeSecondes} seconds`)
                    }

                })
            }
            else if (team == 20 || team >= 30 && team <= 39) {
                if (team == 20) {

                    const adminPlayer = data.source

                    let allPlayers = [];
                    allPlayers = mc.world.getAllPlayers().map(player => player = player.name)

                    const admin_form2 = new ModalFormData()
                    let playerName = String(adminPlayer.name)
                    let player = adminPlayer
                    const n = "\n"
                    admin_form2.title({ translate: `admin_form2.title` })// mute menü
                    admin_form2.dropdown({ translate: `admin_form2.dropdown`, with: [n, n] }, allPlayers, 0) //`\n§c§lPlayer : \n `
                    admin_form2.slider({ translate: `admin_form2.slider1`, with: [n, n, n] }, 0, 60, 1, 0)//\n§c§lmute §4Time :\n\n§c§lDays §7
                    admin_form2.slider({ translate: `admin_form2.slider2`, with: [n, n] }, 0, 23, 1, 0)//§c§lHours §7
                    admin_form2.slider({ translate: `admin_form2.slider3`, with: [n, n] }, 0, 59, 1, 0)//§c§lMinutes §7
                    admin_form2.slider({ translate: `admin_form2.slider4`, with: [n, n] }, 0, 59, 1, 0)//§c§lSecondes §7
                    admin_form2.toggle({ translate: `admin_form2.toggle`, with: [n, n] }, false)//§4§lPermanently
                    admin_form2.textField({ translate: `admin_form2.textFlield`, with: [n, n] }, "mute Reason", "spamming")//"\n§c§lmute Reason §7: \n", "§omute Reason", "spamming"
    
                    admin_form2.show(adminPlayer).then(r => {

                        let muteTimeSecondes = r.formValues[4]
                        let muteTimeMinutes = r.formValues[3]
                        let muteTimeHours = r.formValues[2]
                        let muteTimeDays = r.formValues[1]
                        let mutePlayer = allPlayers[r.formValues[0]]
                        let muteMessage = r.formValues[6]

                        // This will stop the code when player close the form
                        let mutePanel = r.formValues

                        let allmuteTime = (muteTimeSecondes + (muteTimeMinutes * 60) + (muteTimeHours * 60 * 60) + (muteTimeDays * 24 * 60 * 60)) * 1000
                        let demute = (get_score("t", mutePlayer) + (allmuteTime/1000))
                        // This will give every input as their own variable
                        mc.world.getDimension('overworld').runCommandAsync(`tellraw @a {\"rawtext\":[{\"text\":\"§l§c${playerName}§r§c muted §4${mutePlayer}\n§cCauses §7: ${muteMessage}\n§cTime §7: ${muteTimeDays} Day(s) ${muteTimeHours} hour(s) ${muteTimeMinutes} Minute(s) ${muteTimeSecondes} Seconde(s).\"}]}`)
                        mc.world.getDimension('overworld').runCommandAsync(`tag "${mutePlayer}" add mute`)
                        mc.world.getDimension('overworld').runCommandAsync(`tag "${mutePlayer}" add "muteReason:${muteMessage}"`)
                        mc.world.getDimension('overworld').runCommandAsync(`tag "${mutePlayer}" add "muteBy:${playerName}"`)
                        mc.world.getDimension('overworld').runCommandAsync(`tag "${mutePlayer}" add "demuteDate:${demute}"`)
                        mc.world.getDimension('overworld').runCommandAsync(`tag "${mutePlayer}" add "muteAllmuteTime:${allmuteTime}"`)
                        mc.world.getDimension("overworld").runCommandAsync(`scoreboard players set "/${mutePlayer}" mutePlayerArray 1`)
                        console.log(`user ${mutePlayer} was muted by ${playerName} with the team sb id ${team} because of ${muteMessage} for a time of ${muteTimeDays} days ${muteTimeHours} houers ${muteTimeMinutes} minutes ${muteTimeSecondes} seconds`)
                    })
                }
                else if (team >= 30 && team <= 40) {
                    if (team == 31) {

                        const adminPlayer = data.source

                        let allPlayers = [];
                        allPlayers = mc.world.getAllPlayers().map(player => player = player.name)
    
                        const admin_form2 = new ModalFormData()
                        let playerName = String(adminPlayer.name)
                        let player = adminPlayer
                        const n = "\n"
                        admin_form2.title({ translate: `admin_form2.title` })// mute menü
                        admin_form2.dropdown({ translate: `admin_form2.dropdown`, with: [n, n] }, allPlayers, 0) //`\n§c§lPlayer : \n `
                        admin_form2.slider({ translate: `admin_form2.slider1`, with: [n, n, n] }, 0, 60, 1, 0)//\n§c§lmute §4Time :\n\n§c§lDays §7
                        admin_form2.slider({ translate: `admin_form2.slider2`, with: [n, n] }, 0, 23, 1, 0)//§c§lHours §7
                        admin_form2.slider({ translate: `admin_form2.slider3`, with: [n, n] }, 0, 59, 1, 0)//§c§lMinutes §7
                        admin_form2.slider({ translate: `admin_form2.slider4`, with: [n, n] }, 0, 59, 1, 0)//§c§lSecondes §7
                        admin_form2.toggle({ translate: `admin_form2.toggle`, with: [n, n] }, false)//§4§lPermanently
                        admin_form2.textField({ translate: `admin_form2.textFlield`, with: [n, n] }, "mute Reason", "spamming")//"\n§c§lmute Reason §7: \n", "§omute Reason", "spamming"
        
                        admin_form2.show(adminPlayer).then(r => {
    
                            let muteTimeSecondes = r.formValues[4]
                            let muteTimeMinutes = r.formValues[3]
                            let muteTimeHours = r.formValues[2]
                            let muteTimeDays = r.formValues[1]
                            let mutePlayer = allPlayers[r.formValues[0]]
                            let muteMessage = r.formValues[6]
    
                            // This will stop the code when player close the form
                            let mutePanel = r.formValues
    
                            let allmuteTime = (muteTimeSecondes + (muteTimeMinutes * 60) + (muteTimeHours * 60 * 60) + (muteTimeDays * 24 * 60 * 60)) * 1000
                            let demute = (get_score("t", mutePlayer) + (allmuteTime/1000))
                            // This will give every input as their own variable
                            mc.world.getDimension('overworld').runCommandAsync(`tellraw @a {\"rawtext\":[{\"text\":\"§l§c${playerName}§r§c muted §4${mutePlayer}\n§cCauses §7: ${muteMessage}\n§cTime §7: ${muteTimeDays} Day(s) ${muteTimeHours} hour(s) ${muteTimeMinutes} Minute(s) ${muteTimeSecondes} Seconde(s).\"}]}`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${mutePlayer}" add mute`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${mutePlayer}" add "muteReason:${muteMessage}"`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${mutePlayer}" add "muteBy:${playerName}"`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${mutePlayer}" add "demuteDate:${demute}"`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${mutePlayer}" add "muteAllmuteTime:${allmuteTime}"`)
                            mc.world.getDimension("overworld").runCommandAsync(`scoreboard players set "/${mutePlayer}" mutePlayerArray 1`)
                            console.log(`user ${mutePlayer} was muted by ${playerName} with the team sb id ${team} because of ${muteMessage} for a time of ${muteTimeDays} days ${muteTimeHours} houers ${muteTimeMinutes} minutes ${muteTimeSecondes} seconds`)
                        })

                    }
                    else if (team == 32) {

                        const adminPlayer = data.source

                        let allPlayers = [];
                        allPlayers = mc.world.getAllPlayers().map(player => player = player.name)
    
                        const admin_form2 = new ModalFormData()
                        let playerName = String(adminPlayer.name)
                        let player = adminPlayer
                        const n = "\n"
                        admin_form2.title({ translate: `admin_form2.title` })// mute menü
                        admin_form2.dropdown({ translate: `admin_form2.dropdown`, with: [n, n] }, allPlayers, 0) //`\n§c§lPlayer : \n `
                        admin_form2.slider({ translate: `admin_form2.slider1`, with: [n, n, n] }, 0, 60, 1, 0)//\n§c§lmute §4Time :\n\n§c§lDays §7
                        admin_form2.slider({ translate: `admin_form2.slider2`, with: [n, n] }, 0, 23, 1, 0)//§c§lHours §7
                        admin_form2.slider({ translate: `admin_form2.slider3`, with: [n, n] }, 0, 59, 1, 0)//§c§lMinutes §7
                        admin_form2.slider({ translate: `admin_form2.slider4`, with: [n, n] }, 0, 59, 1, 0)//§c§lSecondes §7
                        admin_form2.toggle({ translate: `admin_form2.toggle`, with: [n, n] }, false)//§4§lPermanently
                        admin_form2.textField({ translate: `admin_form2.textFlield`, with: [n, n] }, "mute Reason", "spamming")//"\n§c§lmute Reason §7: \n", "§omute Reason", "spamming"
        
                        admin_form2.show(adminPlayer).then(r => {
    
                            let muteTimeSecondes = r.formValues[4]
                            let muteTimeMinutes = r.formValues[3]
                            let muteTimeHours = r.formValues[2]
                            let muteTimeDays = r.formValues[1]
                            let mutePlayer = allPlayers[r.formValues[0]]
                            let muteMessage = r.formValues[6]
    
                            // This will stop the code when player close the form
                            let mutePanel = r.formValues
    
                            let allmuteTime = (muteTimeSecondes + (muteTimeMinutes * 60) + (muteTimeHours * 60 * 60) + (muteTimeDays * 24 * 60 * 60)) * 1000
                            let demute = (get_score("t", mutePlayer) + (allmuteTime/1000))
                            
                            // This will give every input as their own variable
                            mc.world.getDimension('overworld').runCommandAsync(`tellraw @a {\"rawtext\":[{\"text\":\"§l§c${playerName}§r§c muted §4${mutePlayer}\n§cCauses §7: ${muteMessage}\n§cTime §7: ${muteTimeDays} Day(s) ${muteTimeHours} hour(s) ${muteTimeMinutes} Minute(s) ${muteTimeSecondes} Seconde(s).\"}]}`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${mutePlayer}" add mute`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${mutePlayer}" add "muteReason:${muteMessage}"`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${mutePlayer}" add "muteBy:${playerName}"`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${mutePlayer}" add "demuteDate:${demute}"`)
                            mc.world.getDimension('overworld').runCommandAsync(`tag "${mutePlayer}" add "muteAllmuteTime:${allmuteTime}"`)
                            mc.world.getDimension("overworld").runCommandAsync(`scoreboard players set "/${mutePlayer}" mutePlayerArray 1`)
                            console.log(`user ${mutePlayer} was muted by ${playerName} with the team sb id ${team} because of ${muteMessage} for a time of ${muteTimeDays} days ${muteTimeHours} houers ${muteTimeMinutes} minutes ${muteTimeSecondes} seconds`)
                        })
                    }
                }

            }
            else { mc.world.sendMessage(`test`) }
}


export function searchByName(player) {

    const serachByNameForm = new ModalFormData()
    serachByNameForm.title(`§cSearch §4Player§c Panel`)
    serachByNameForm.textField("\n§cSearch player By §4Name§c : \n", "§oPlayer Name")
    serachByNameForm.show(player).then(r => {
        let playerSearched = r.formValues[0]

        // This will stop the code when player close the form
        if (r.isCanceled) return mc.world.getDimension('overworld').runCommandAsync(`tellraw "${player.name}" {"rawtext":[{"text":"§7[§4BanPlugin§7] §cMenu Closed !"}]}`);
        let unmuteMenu = new ActionFormData()
        unmuteMenu.title(`§cSearch §4Player§c Panel`)
        unmuteMenu.body(`§cmute^d players search with ' §8${playerSearched}§c ' : `)
        let mutePlayerNumbers = []
        let mutePlayerName = []
        let getmutePlayer = mc.world.scoreboard.getObjective('mutePlayerArray').getParticipants()
        getmutePlayer.forEach(function (element) {
            if (element.displayName.includes('/') && element.displayName.includes(playerSearched)) {
                if (element.displayName.includes("permanently")) {
                    let playerName = element.displayName.replace('/', '')
                    playerName = playerName.replace(" permanently", "")
                    unmuteMenu.button(playerName)
                    mutePlayerName.push(element.displayName)
                    
                    
                    
                    
                    
                    
                }
                else {
                    let playerName = element.displayName.replace('/', '')
                    unmuteMenu.button(playerName)
                    mutePlayerName.push(element.displayName)
                    mutePlayerNumbers++
                }

            }
        })
        unmuteMenu.button("§c§lBack")
        unmuteMenu.show(player).then(r => {
            let respond = r.selection

            // This will stop the code when player close the form
            if (r.isCanceled) return mc.world.getDimension('overworld').runCommandAsync(`tellraw "${player.name}" {"rawtext":[{"text":"§7[§4BanPlugin§7] §cMenu Closed !"}]}`);
            let back = mutePlayerNumbers
            let UnmutePlayer = mutePlayerName[respond]
            if (respond == back) {
                searchByName(player)
            }
            if (respond < back) {
                unmutePlayer(player, UnmutePlayer, 'search')
            }
            // Do something
        })
    })
}

export function unmutePlayerForm(pl) {
        const team = teamsb(pl)
            const player = pl
            let unmuteMenu = new ActionFormData()
            unmuteMenu.title(`§c§lUnmute §4Menu`)
            unmuteMenu.button("§c§lSearch By §4Name")
            unmuteMenu.body(`§cmuted Players : `)
            let mutePlayerNumbers = []
            let mutePlayerName = []
            let getmutePlayer = mc.world.scoreboard.getObjective('mutePlayerArray').getParticipants()
            getmutePlayer.forEach(function (element) {
                if (element.displayName.includes('/')) {
                    let playerName = element.displayName.replace('/', '')
                    unmuteMenu.button(playerName)
                    mutePlayerName.push(element.displayName)
                    mutePlayerNumbers++
                }
            })
            unmuteMenu.button("§c§lReload")
            unmuteMenu.button("§c§lExit §4Menu")
            unmuteMenu.show(player).then(r => {
                let respond = r.selection

                // This will stop the code when player close the form
                if (r.isCanceled) return mc.world.getDimension('overworld').runCommandAsync(`tellraw "${player.name}" {"rawtext":[{"text":"§7[§4BanPlugin§7] §cMenu Closed !"}]}`);
                let back = mutePlayerNumbers + 2
                let reaload = mutePlayerNumbers + 1
                let UnmutePlayer = mutePlayerName[respond - 1]

                if (respond == 0) {
                    searchByName(player)
                }
                if (respond == back) {
                }
                if (respond == reaload) {
                    unmutePlayerForm(player)
                }
                if (respond < reaload && respond >= 1) {
                    unmutePlayer(player, UnmutePlayer, 'main')
                }
            })
}


export function mutelistmute(player){
    let mutelist1 = mutelist()
    mutelist1.forEach((element) => {

        let splitted = element.split(";")
        let p = splitted.find((p) => {p.startsWith("pl:")})
        let banMessage = splitted.find((b) => {b.startsWith("bg:")})

        try {
            p.replace("pl:" , "")
        banMessage.replace("mg:", "")
        } catch (error) {
            
        }
        
        

        let playerName = "system"


        if (p === player.name){
            let mutePlayer = p
            mc.world.getDimension('overworld').runCommandAsync(`tag "${mutePlayer}" add muteDef`)
            mc.world.getDimension('overworld').runCommandAsync(`tag "${mutePlayer}" add "muteReason:${muteMessage}"`)
            mc.world.getDimension('overworld').runCommandAsync(`tag "${mutePlayer}" add "muteBy:${playerName}"`)
            mc.world.getDimension('overworld').runCommandAsync(`tellraw @a {\"rawtext\":[{\"text\":\"§l§c${playerName}§r§c muted §4${mutePlayer}\n§cCauses §7: ${muteMessage}\n§cTime §7: Permanently.\"}]}`)
            mc.world.getDimension("overworld").runCommandAsync(`scoreboard players set "/${mutePlayer} permanently" mutePlayerArray 1`)
            mc.world.getDimension("overworld").runCommandAsync(`scoreboard players set "/${mutePlayer} permanently" mutePlayerArraytime 1`)
            console.log(`user ${mutePlayer} was muted by ${playerName} because of ${muteMessage} mutetime Permanently`)
}
        else {
            return
        }
    });
}

export function onspawnmute(data){
    if (data.player.hasTag('mute')) {
        let player = data.player
        let playerName = data.player.name
        let allmuteTimeTag = data.player.getTags().find((tag) => tag.startsWith("muteAllmuteTime:"))?.substring(16) ?? null;
        allmuteTimeTag.substring(0, (allmuteTimeTag.length - 1))
        let muteDate = data.player.getTags().find((tag) => tag.startsWith("muteDate:"))?.substring(9) ?? null;
        let muteBy = data.player.getTags().find((tag) => tag.startsWith("muteBy:"))?.substring(7) ?? null;
        let muteMessage = data.player.getTags().find((tag) => tag.startsWith("muteReason:"))?.substring(10) ?? null;

        let demuteTime = data.player.getTags().find((tag) => tag.startsWith("demuteDate:"))?.substring(11) ?? null;
        let length = demuteTime.length
        length - 1
        demuteTime = demuteTime.substring(0, length)

        let remainmuteTime = (demuteTime - get_score('t', data.player))
        remainmuteTime = dhm(remainmuteTime*1000)


        if (!ismute(data.player.name)) {
            let i = 0
            if (data.player.hasTag('mute')) {
                let i = 0
                for (i = 0; i < 4; i++) {
                    let playerTag = data.player.getTags()
                    let tag = playerTag.find((tag) => tag.startsWith("mute")) ?? null;
                    data.player.removeTag(tag)
                }
                for (i = 0; i < 4; i++) {
                    let playerTag = data.player.getTags()
                    let tag = playerTag.find((tag) => tag.startsWith("demute")) ?? null;
                    data.player.removeTag(tag)
                }
            }
        }
        if (get_score('t', data.player) >= demuteTime) {
            mc.world.getDimension("overworld").runCommandAsync(`scoreboard players reset "/${data.player.name}" mutePlayerArray`)
            let i = 0
            if (data.player.hasTag('mute')) {
                let i = 0
                for (i = 0; i < 4; i++) {
                    let playerTag = data.player.getTags()
                    let tag = playerTag.find((tag) => tag.startsWith("mute")) ?? null;
                    data.player.removeTag(tag)
                }
                for (i = 0; i < 4; i++) {
                    let playerTag = data.player.getTags()
                    let tag = playerTag.find((tag) => tag.startsWith("demute")) ?? null;
                    data.player.removeTag(tag)
                }
            }
        }
        else {
            data.player.sendMessage(`\n§cYou have been muted by §4${muteBy}§c ! \n§cCauses §7: ${muteMessage}\n§cTime §7: ${[0]} Day(s) ${remainmuteTime[1]} Hour(s) ${remainmuteTime[2]} Minute(s) ${remainmuteTime[3]} Seconde(s)`)
        }
    }
    else if (data.player.hasTag('muteDef')) {
        if (!ismute(data.player.name)) {
            data.player.removeTag('muteDef')
            let i
            for (i = 0; i < 2; i++) {
                let playerTag = data.player.getTags()
                let tag = playerTag.find((tag) => tag.startsWith("mute")) ?? null;
                data.player.removeTag(tag)
            }
        } else {
            data.player.sendMessage(`\n§cYou have been muted by §4${muteBy}§c ! \n§cCauses §7: ${muteMessage}\n§cTime §7: ${[0]} Day(s) ${remainmuteTime[1]} Hour(s) ${remainmuteTime[2]} Minute(s) ${remainmuteTime[3]} Seconde(s)`)
        }
    }
}



export function check_mute_time(player){
    if (player == undefined) return
    let demuteTime = player.getTags().find((tag) => tag.startsWith("demuteDate:"))?.substring(11) ?? null;
    if (get_score('t', player) >= demuteTime)
        mc.world.getDimension("overworld").runCommandAsync(`scoreboard players reset "/${player.name}" mutePlayerArray`)

}

// t = secunden
// t1 == minuten
// t2 == stunden
// t3 == tage