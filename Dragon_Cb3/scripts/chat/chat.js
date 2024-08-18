
import * as mc from "@minecraft/server"
import { ActionFormData, ActionFormResponse, FormResponse, MessageFormData, MessageFormResponse, ModalFormData, ModalFormResponse } from "@minecraft/server-ui"
import { enchantmentlist } from "../data/enchantments.js"
import { isBanned, unbanPlayer, banPlayer, searchByName, unBanPlayerForm, ingamebannen, autoban } from "../bansystem/bansystem.js"
import { invseebypass, tpbypass, antikickbypass, banned_words_bypass } from "../data/bypass"
import { invsee } from "../invsee.js"
import { dhm } from "../data/time.js"
import { teamsb, set_score, get_all_objective_element, get_score, set_chat_connection } from "../main.js"
import { commandprefix } from "../main.js"
import { getallplayersnames, getallplayers, checkplonline, initializeScoreboard } from "../main.js"
import { banword } from "../data/banned_words.js"
import { helplist } from "../data/commandlist.js"
import { mutePlayer, unmutePlayerForm } from "../bansystem/mutesystem.js"




function check_banned_words(chat_message, player) {
    let banwordlist = banword()
    for (let x in banwordlist) {
        const element = banwordlist[x];
        if (chat_message.includes(element)) {
            return false
        } 
        else continue
    }
    return chat_message

}






export function chat (eventData) {
    eventData.cancel = true ;
    var pl = eventData.sender
    let team = teamsb(pl)
    const x = eventData.sender.location.x
    const y = eventData.sender.location.y
    const z = eventData.sender.location.z
    console.log(`user:${String(eventData.sender.name)}, location: ${String(x)} ${String(y)} ${String(z)} message: ${String(eventData.message)}`)
    if (eventData.message.startsWith(commandprefix)) {
        let getPlayer = null
        const team = teamsb(pl)
        const message = eventData.message.replace(commandprefix, "")
        switch (true) {
            case message.startsWith("teamchat"):
                const teammessage = eventData.message.replace("!teamchat", "")
                if (teamsb(pl) >= 1)

                    mc.world.getDimension('overworld').runCommandAsync(`tellraw @a[scores={team=1..}] {"rawtext":[{"text":"§9<Teamchat: ${pl.nameTag}>§5 ${teammessage}"}]} `)

                else {

                    pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§4Du hast keine berechtigung für diesen befehl"}]} `)

                }

                break

            case message.startsWith("tc"):
                const teammessage2 = eventData.message.replace("!tc", "")
                if (teamsb(pl) >= 1)
    
                    pl.runCommandAsync(`tellraw @a[scores={team=1..}] {"rawtext":[{"text":"§9<Teamchat: ${pl.nameTag}>§5 ${teammessage2}"}]} `)
    
                else {
    
                    pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§4Du hast keine berechtigung für diesen befehl"}]} `)
    
                }
    
                break   

            case message.startsWith("tp"):
            
                if (team == 1 || team == 2 || team == 20 || team == 21 || team == 22 || team == 31 || team == 32) {

                    if (message === "tp") {
                        pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"Deine auswahl möglichkeiten sind: \n"}]} `)

                        let getplayernames = getallplayersnames()

                        getplayernames.forEach(function (element) {

                            pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"${element}, "}]} `)

                        })

                        return

                    }
                    getPlayer = message.replace("tp ", "")

                    let players = getallplayers()

                    let player = players.find((tag) => tag.name.includes(getPlayer))

                    if (player.name === getPlayer) {

                        if (teamsb(player) == 1 || teamsb(player) == 2 || teamsb(player) == 20 || teamsb(player) == 21 || teamsb(player) == 22) {

                            pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§4Du hast keine berechtigung dich zu spielern in der Leitungsebene Telepotieren"}]} `)


                        }
                        else if (mc.world.scoreboard.getObjective("m7").getScore(player) == 1 && mc.world.scoreboard.getObjective("m7").getScore(pl) == 0) {
                            pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§4Bitte begebe dich erst in den creative bereich"}]} `)
                        }
                        else if (mc.world.scoreboard.getObjective("m7").getScore(player) == 1 && mc.world.scoreboard.getObjective("m7").getScore(pl) == 1) {
                            pl.runCommandAsync(`tp @a[name="${pl.name}"] @a[name="${player.name}"]`)
                            pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§aDu wurdest erfolgreich teleportiert"}]} `)
                        }
                        else if (mc.world.scoreboard.getObjective("m7").getScore(player) == 0 && mc.world.scoreboard.getObjective("m7").getScore(pl) == 1) {
                            pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§4Bitte begebe dich erst in den citybuild bereich"}]} `)
                        }
                        else if (player.name === getPlayer) {
                            pl.runCommandAsync(`tp @a[name="${pl.name}"] @a[name="${player.name}"]`)
                            pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§aDu wurdest erfolgreich teleportiert"}]} `)
                        }
                    }
                    else {
                        pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§9Bitte gebe einen spieler namen ein"}]} `)
                    }


                }
                else {
                    pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§4Du hast keine berechtigung für diesen befehl"}]} `)
                }
                break
            case message.startsWith("kick"):
                if (team == 1 || team == 2 || team == 20 || team == 21 || team == 22 || team == 31 || team == 32 || team == 33) {
                    if (message === "kick") {
                        pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"Deine auswahl möglichkeiten sind: \n"}]} `)
                        let getplayernames = getallplayersnames()
                        getplayernames.forEach(function (element) {
                            pl.runCommandAsync(`tellraw @a[name="${pl.nameTag}"] {"rawtext":[{"text":"${element}, "}]} `)
                        })
                        return
                    }
                    getPlayer = message.replace("kick ", "")
                    let players = getallplayers()
                    let player = players.find((tag) => tag.name.includes(getPlayer))
                    if (getPlayer === player.name) {
                        if (!(getPlayer == "dragonum1988" || getPlayer == "dragonum19882")) {
                            switch (team) {
                                case 1:
                                    pl.runCommandAsync(`event entity @a[name="${player.name}"] c:crash`)
                                    pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§2Die person ${player.name} wurde erfolgreich gekickt"}]}`)
                                    break
                                case 2:
                                    if (teamsb(player) == 1 || teamsb(player) == 20) {
                                        pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§4Du hast keine berechtigung diese Person zu kicken"}]} `)
                                    }
                                    else {
                                        pl.runCommandAsync(`event entity @a[name="${player.name}", scores={team =! 1}] c:crash`)
                                        pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§2Die person ${player.name} wurde erfolgreich gekickt"}]}`)
                                    }                                    
                                    break
                                case 20:
                                    if (teamsb(player) == 1 || teamsb(player) == 2) {
                                        pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§4Du hast keine berechtigung diese Person zu kicken"}]} `)
                                    }
                                    else {
                                        pl.runCommandAsync(`event entity @a[name="${player.name}", scores={team =! 1}] c:crash`)
                                        pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§2Die person ${player.name} wurde erfolgreich gekickt"}]}`)
                                    }
                                    break
                                case 21:
                                    if (teamsb(player) == 1 || teamsb(player) == 2 || teamsb(player) == 20) {
                                        pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§4Du hast keine berechtigung diese Person zu kicken"}]} `)
                                    }
                                    else {
                                        pl.runCommandAsync(`event entity @a[name="${player.name}", scores={team =! 1}] c:crash`)
                                        pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§2Die person ${player.name} wurde erfolgreich gekickt"}]}`)
                                    }
                                    break

                                case 22:
                                    if (teamsb(player) == 1 || teamsb(player) == 2 || teamsb(player) == 20 || teamsb(player) == 21) {
                                        pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§4Du hast keine berechtigung diese Person zu kicken"}]} `)
                                    }
                                    else {
                                        pl.runCommandAsync(`event entity @a[name="${player.name}", scores={team =! 1}] c:crash`)
                                        pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§2Die person ${player.name} wurde erfolgreich gekickt"}]}`)
                                    }
                                    break
                                case 31:
                                    if (teamsb(player) == 1 || teamsb(player) == 2 || teamsb(player) == 20 || teamsb(player) == 21) {
                                        pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§4Du hast keine berechtigung diese Person zu kicken"}]} `)
                                    }
                                    else {
                                        pl.runCommandAsync(`event entity @a[name="${player.name}", scores={team =! 1}] c:crash`)
                                        pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§2Die person ${player.name} wurde erfolgreich gekickt"}]}`)

                                    }
                                    break
                                case 32:
                                    if (teamsb(player) == 1 || teamsb(player) == 2 || teamsb(player) == 20 || teamsb(player) == 21 || teamsb(player) == 31) {
                                        pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§4Du hast keine berechtigung diese Person zu kicken"}]} `)
                                    }
                                    else {
                                        pl.runCommandAsync(`event entity @a[name="${player.name}", scores={team =! 1}] c:crash`)
                                        pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§2Die person ${player.name} wurde erfolgreich gekickt"}]}`)
                                    }
                                    break
                                case 33:
                                    if (teamsb(player) == 1 || teamsb(player) == 2 || teamsb(player) == 20 || teamsb(player) == 21 || teamsb(player) == 32) {
                                        pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§4Du hast keine berechtigung diese Person zu kicken"}]} `)
                                    }
                                    else {
                                        pl.runCommandAsync(`event entity @a[name="${player.name}", scores={team =! 1}] c:crash`)
                                        pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§2Die person ${player.name} wurde erfolgreich gekickt"}]}`)
                                    }
                                    break
                                default:
                                    pl.runCommandAsync(`event entity @a[name="${player.name}"] c:crash`)
                                    pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§2Die person ${player.name} wurde erfolgreich gekickt"}]}`)
                                    pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§2Die person ${player.name} wurde erfolgreich gekickt"}]}`)
                            }
                        }
                        else {
                            let start = 10000
                            let breaktest = 0
                            start = dhm(start)
                            let seconds = start[3]
                            initializeScoreboard(`kicktime`)
                            let kicktime = mc.world.scoreboard.getObjective("kicktime")
                            kicktime.setScore(pl, seconds)
                            while (seconds >= 0 || breaktest == 1) {
                                mc.world.afterEvents.playerLeave.subscribe((playerintern) => {
                                    if (playerintern.playerName === pl.name) {
                                        breaktest = 1
                                    }
                                })
                                mc.system.runInterval(() => {
                                    kicktime.setScore(pl, seconds)
                                    seconds = (seconds - 1)
                                }, 20)
                                if (seconds >= 0) {
                                    pl.runCommandAsync(`scoreboard players reset @a["${pl.name}"] kicktime`)
                                    pl.runCommandAsync(`kick @a["${pl.name}"] Du hast probiert den owner zu kicken`)
                                }
                            }

                        }
                    }

                    else {
                        pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§9Bitte gebe einen gültigen spieler namen ein! Du bekommst eine liste mit den befehl !kick"}]} `)
                    }
                }
                else {
                    pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§4Du hast keine berechtigung für diesen befehl"}]} `)
                }
                break
            case message.startsWith("invsee"):
                if (message === "invsee") {
                    pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"Deine auswahl möglichkeiten sind: \n"}]} `)
                    let getplayernames = getallplayersnames()
                    getplayernames.forEach(function (element) {
                        pl.runCommandAsync(`tellraw @a[name="${pl.nameTag}"] {"rawtext":[{"text":"${element}, "}]} `)
                    })
                    return
                }
                getPlayer = message.replace("invsee ", "")
                let player = checkplonline(getPlayer)
                player = player[1]
                let checkteam = teamsb(player)
                if (checkteam === 1) {pl.runCommandAsync(`tellraw @a[name="${pl.name}"] {"rawtext":[{"text":"§4Du hast keine rechte um das inv von ${player.name} zu sehen"}]}`)}
                else if (checkteam === 2  && team == 1) {invsee(player, pl)}
                else if (checkteam === 20 && team == 1 || team == 2) {invsee(player, pl)}
                else if (checkteam === 21 && team == 1 || team == 2 || team == 20) {invsee(player, pl)}
                else if (checkteam === 31 && team == 1 || team == 2 || team == 20 || team == 21) {invsee(player, pl)}
                else if (checkteam === 32 && team == 1 || team == 2 || team == 20 || team == 21 || team == 22) {invsee(player, pl)}
                else if (checkteam === 32 && team == 1 || team == 2 || team == 20 || team == 21 || team == 22 || team == 31) {invsee(player, pl)}
                else if (checkteam === 33 && team == 1 || team == 2 || team == 20 || team == 21 || team == 22 || team == 31 || team == 32) {invsee(player, pl)}
                else {invsee(player, pl)}
                break
            case message.startsWith("ban"):
                if (team >= 1){
                    let gm = pl.getGameMode()
                    if (gm == "creative"){
                        pl.runCommandAsync(`gamemode 0 ${pl.name}`)
                        pl.runCommandAsync(`damage @s 0 magic`)
                        pl.runCommandAsync(`gamemode 1 ${pl.name}`)
                    }else if (gm == "spectator"){
                        pl.runCommandAsync(`gamemode 0 ${pl.name}`)
                        pl.runCommandAsync(`damage @s 0 magic`)
                        pl.runCommandAsync(`gamemode spectator ${pl.name}`)
                    }else {
                        pl.runCommandAsync(`damage @s 0 magic`)
                    }
                    mc.system.runTimeout((time)=>{
                        banPlayer(pl)
                    }, 20)
                }
                else {
                    pl.sendMessage("§4Du hast keine rechte um diesen befehl auszuführen")
                }
                break
            case message.startsWith("unban"):
                if (team >= 1){
                    let gm = pl.getGameMode()
                    if (gm == "creative"){
                        pl.runCommandAsync(`gamemode 0 ${pl.name}`)
                        pl.runCommandAsync(`damage @s 0 magic`)
                        pl.runCommandAsync(`gamemode 1 ${pl.name}`)
                    }else if (gm == "spectator"){
                        pl.runCommandAsync(`gamemode 0 ${pl.name}`)
                        pl.runCommandAsync(`damage @s 0 magic`)
                        pl.runCommandAsync(`gamemode spectator ${pl.name}`)
                    }else {
                        pl.runCommandAsync(`damage @s 0 magic`)
                    }                    
                    mc.system.runTimeout((time)=>{
                        unBanPlayerForm(pl)
                    }, 20)
                }
                else {
                    pl.sendMessage("§4Du hast keine rechte um diesen befehl auszuführen")
                }
                break

            case message.startsWith("mute"):
                if (team >= 1){
                    let gm = pl.getGameMode()
                    if (gm == "creative"){
                        pl.runCommandAsync(`gamemode 0 ${pl.name}`)
                        pl.runCommandAsync(`damage @s 0 magic`)
                        pl.runCommandAsync(`gamemode 1 ${pl.name}`)
                    }else if (gm == "spectator"){
                        pl.runCommandAsync(`gamemode 0 ${pl.name}`)
                        pl.runCommandAsync(`damage @s 0 magic`)
                        pl.runCommandAsync(`gamemode spectator ${pl.name}`)
                    }else {
                        pl.runCommandAsync(`damage @s 0 magic`)
                    }
                    mc.system.runTimeout((time)=>{
                        mutePlayer(pl)
                    }, 20)
                }
                else {
                    pl.sendMessage("§4Du hast keine rechte um diesen befehl auszuführen")
                }
                break

            case message.startsWith("unmute"):
                if (team >= 1){
                    let gm = pl.getGameMode()
                    if (gm == "creative"){
                        pl.runCommandAsync(`gamemode 0 ${pl.name}`)
                        pl.runCommandAsync(`damage @s 0 magic`)
                        pl.runCommandAsync(`gamemode 1 ${pl.name}`)
                    }else if (gm == "spectator"){
                        pl.runCommandAsync(`gamemode 0 ${pl.name}`)
                        pl.runCommandAsync(`damage @s 0 magic`)
                        pl.runCommandAsync(`gamemode spectator ${pl.name}`)
                    }else {
                        pl.runCommandAsync(`damage @s 0 magic`)
                    }
                    mc.system.runTimeout((time)=>{
                        unmutePlayerForm(pl)
                    }, 20   )
                }
                else {
                    pl.sendMessage("§4Du hast keine rechte um diesen befehl auszuführen")
                }
                break

            case message.startsWith("help"):
                if (team >= 1){
                    
                    let help_team = helplist_team()
                    pl.sendMessage("Die befehle lauten \n")
                    help_team.forEach(element => {
                        pl.sendMessage(`${element}`)
                    });
                    
                }else {
                    let help = helplist()
                    pl.sendMessage("Die befehle lauten \n")
                    help.forEach(element => {
                        pl.sendMessage(`${element}`)
                    });
                }


                

        }
    }
    else if (team >= 1) {
        let chatmessage = check_banned_words(eventData.message, pl)
        if (chatmessage == false){
            return false
        }
        
        switch (team) {
            case 1:
                mc.world.sendMessage(`<§3Owner:${pl.name}§r> ${chatmessage}`);
                set_chat_connection(`<§3Owner:${pl.name}§r> ${chatmessage}`)
                break
            case 2:
                mc.world.sendMessage(`<§5Admin:${pl.name}§r> ${chatmessage}`);
                set_chat_connection(`<§5Admin:${pl.name}§r> ${chatmessage}`)

                break
            case 10:
                mc.world.sendMessage(`<§9Builder:${pl.name}§r> ${chatmessage}`);
                set_chat_connection(`<§9Builder:${pl.name}§r> ${chatmessage}`)

                break

            case 20:
                mc.world.sendMessage(`<§7Sr Developer:${pl.name}§r> ${chatmessage}`);
                set_chat_connection(`<§7Sr Developer:${pl.name}§r> ${chatmessage}`)
                break

            case 21:
                mc.world.sendMessage(`<§dDeveloper:${pl.name}§r> ${chatmessage}`);
                set_chat_connection(`<§dDeveloper:${pl.name}§r> ${chatmessage}`)
                break
            case 22:
                mc.world.sendMessage(`<§eJr Developer:${pl.name}§r> ${chatmessage}`);
                set_chat_connection(`<§eJr Developer:${pl.name}§r> ${chatmessage}`)


                break
            case 31:
                mc.world.sendMessage(`<§gSr Supporter:${pl.name}§r> ${chatmessage}`);
                set_chat_connection(`<§gSr Supporter:${pl.name}§r> ${chatmessage}`)

                break
            case 32:
                mc.world.sendMessage(`<§aSupporter:${pl.name}§r> ${chatmessage}`);
                set_chat_connection(`<§aSupporter:${pl.name}§r> ${chatmessage}`)

                break
            case 33:
                mc.world.sendMessage(`<§bJr Supporter:${pl.name}§r> ${chatmessage}`);
                set_chat_connection(`<§bJr Supporter:${pl.name}§r> ${chatmessage}`)
                break





        }
    }else if (get_all_objective_element("mutePlayerArray").includes("/" + pl.name) || get_all_objective_element("mutePlayerArray").includes("/" + pl.name + ' permanently')) {
        pl.sendMessage("du bist gemutet ")
        returns
    }
    else {
        let chatmessage = check_banned_words(eventData.message, pl)
                if (chatmessage == false){
                    return
                }
        mc.world.sendMessage(`<§7Player:${pl.name}§r> ${chatmessage}`);
        set_chat_connection(`<§7Player:${pl.name}§r> ${chatmessage}`)

    }
}

