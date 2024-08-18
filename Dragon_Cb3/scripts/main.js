import * as mc from "@minecraft/server"
import { ingamebannen, autoban, banlistban } from "bansystem/bansystem.js"
import { dhm } from "./data/time.js"
import { chat } from "./chat/chat.js"
import { onspawnban } from "./bansystem/bansystem.js"
import { check_mute_time } from "./bansystem/mutesystem.js"
import { uhr } from "./uhr/title_von_uhr.js"
import { settings } from "./data/settings.js"


export const commandprefix = "!"

/**
 * Erstellt ein Scoreboard mit einem benutzerdefinierten Namen.
 * @param {string} scoreboardobjective - Der name des Scoreboard Objective.
 * @param {string} scoreboardName - Der Custom name des scoreboards.
 */
function initializeScoreboardwithcustomname(scoreboardobjective, scoreboardName) {
    // Checkt ob das scoreboard bereits existiert
    if (mc.world.scoreboard.getObjective(scoreboardobjective)) return;

    // fügt das scoreboard mit dem benutzerdefinierten Namen hinzu
    mc.world.scoreboard.addObjective(scoreboardobjective, scoreboardName);
}



/**
 * Erstellt ein Scoreboard mit dem Standardnamen.
 * @param {string} scoreboardName - Der Standardname des scoreboards.
 */
export function initializeScoreboard(scoreboardName) {
    // Checkt ob das scoreboard bereits existiert
    if (mc.world.scoreboard.getObjective(scoreboardName)) return;

    // fügt das scoreboard mit dem Standardnamen hinzu
    mc.world.scoreboard.addObjective(scoreboardName, scoreboardName);
}

/**
 * Holt sich den score von einem Spieler aus einem Scoreboard.
 * @param {string} objective - Der Name des Scoreboards.
 * @param {string} element - der Name des elements.
 * @returns {number} - Der score von spieler aus dem Scoreboard.
 */
export function get_score(objective, element) {
    try {
        // holt den score von spieler aus dem Scoreboard
        return mc.world.scoreboard.getObjective(objective).getScore(element);
        

    } catch (error) {
         //Wenn ein fehler auftritt passiert nichts
    }
}
/**
 * Hohlt alle elemente mit den Scoreboard object
 * @param {string} objective - der name des scoreboards.
 * @returns {string[]} - Eine Liste der elemente.
 */
export function get_all_objective_element(objective) {
    // Erstellt eine leere Liste
    let participantsDisplayNames = [];

    // loopt durch alle elemente aus dem scoreboard
    mc.world.scoreboard.getObjective(objective).getParticipants().forEach(element => {
        // gibt die Anzeigename von jedem elemente zurück und gibt sie in der Liste
        participantsDisplayNames.push(element.displayName);
    });

    // gibt die Liste der elemente zurück
    return participantsDisplayNames;
}
/**
 * Checkt ob ein bestimmtes element in einem Scoreboard object existiert.
 * @param {string} objective - Der name des Scoreboards.
 * @param {string} element - Der name des elements.
 * @returns {boolean} - Gibt true zurück wenn das element existiert andererweise false.
 */
export function check_objective_element(objective, element) {
    try {
        // Checkt ob das element in dem scoreboard existiert
        return mc.world.scoreboard.getObjective(objective).hasParticipant(element);
    } catch (error) {
        // Wenn ein fehler auftritt passiert nichts
        
    }
}



/**
 * Ruft alle scoreboards ab, die ein bestimmtes element enthalten.
 * @param {string} element - der name des elements.
 * @returns {mc.ScoreboardObjective[]} - Eine Liste der scoreboards von den bestimmten element.
 */
export function get_from_player_all_objective(element) {

    try {
        // Erstellt eine leere Liste für die scoreboards
        let listt = []

        // Loopt durch alle scoreboards und checkt ob das element in dem scoreboard existiert
        mc.world.scoreboard.getObjectives().find((objective) => {
            
            // checkt ob das element in dem scoreboard existiert
            if (objective.hasParticipant(element)) {
                // fügt das scoreboard in die liste hinzu
                listt.push(objective)
                
            }
        })
        // gibt die liste der scoreboards zurück
        return listt
    } catch (error) {
        // Wenn ein fehler auftritt passiert nichts
    }
        
}



/**
 * Setzt den score von einen Element in einem Scoreboard.
 * @param {string} objective - Der name des Scoreboards.
 * @param {string} element - Der name des elements.
 * @param {number} score - Der score der gesetzt werden soll.
 */
export function set_score(objective, element, score) {
    // setzt den score von den element in den scoreboard
    mc.world.scoreboard.getObjective(objective).setScore(element, score);
}

/**
 * Fügt den score von einen Element in einem Scoreboardd.
 * @param {string} objective - Der name des Scoreboards.
 * @param {string} element - Der name des elements.
 * @param {number} score - Der score der hinzugefügt werden soll.
 */
export function add_score(objective, element, score) {
    // Fügt den score von den element in den scoreboard
    mc.world.scoreboard.getObjective(objective).addScore(element, score);
}

/**
 * Hohlt alle Scores aus einem bestimmten Scoreboard.
 * @param {string} objective - der name des scoreboards.
 * @returns {number[]} - Eine Liste mit den Scores.
 */
export function get_all_score_from_objective(objective) {
    // Hohlt alle Scores aus dem Scoreboard
    // und gibt diese als Liste zurück
    return mc.world.scoreboard.getObjective(objective).getScores();
}

/**
 * Hohlt sich alle Spieler aus der Welt.
 * @returns {Player[]} - Eine Liste mit den Spielern.
 */
export function getallplayers() {
    // Hohlt sich alle Spieler aus der Welt und gibt diese als Liste zurück
    return mc.world.getAllPlayers()
}



/**
 * Hohlt sich alle Spielernamen aus der Welt.
 * @returns {string[]} - Eine Liste mit den Spielernamens.
 */
export function getallplayersnames() {
    // Erstellt eine leere Liste für die Spielernamen
    let playerNames = [];

    // loopt durch alle Spieler und speichert den Namen in der Liste
    mc.world.getAllPlayers().forEach(player => {
        playerNames.push(player.name);
    });

    // gibt die Liste der Spielernamen zurück
    return playerNames;
}

/**
 * holt sich den score von einem Spieler aus den Team scoreboard.
 * @param {Player} pl - Der Spieler.
 * @returns {number} - Der score von spieler aus dem team scoreboard.
 *                    gibt "None" wenn der Spieler nicht im Scoreboard existiert.
 */
export function teamsb(pl) {
    // Erstellt eine Variable mit den String None zum Speichern des Scores
    let test = "None";

    // Checkt ob der Spieler im Team Scoreboard existiert
    if (mc.world.scoreboard.getObjective('team').hasParticipant(pl)) {
        // Wenn der Spieler im Scoreboard existiert, speichere den Score in der Variable
        test = mc.world.scoreboard.getObjective('team').getScore(pl);
    } else {
        // Wenn der Spieler nicht im Scoreboard existiert, returne "None"
        return;
    }

    // Gibt den Score von dem Spieler aus dem Team Scoreboard zurück
    return test;
}

/**
 * Retrieves the score of a player from the 'Bangruende' objective.
 * @param {Player} pl - The player object.
 * @returns {number} - The score of the player from the 'Bangruende' objective.
 *                    Returns "None" if the player is not in the objective.
 */
export function Bangruende(pl) {
    // Initialize the variable to store the score
    let test = "None";

    // Check if the player is in the 'Bangruende' objective
    if (mc.world.scoreboard.getObjective('Bangruende').hasParticipant(pl)) {
        // If the player is in the objective, get their score and assign it to the variable
        test = mc.world.scoreboard.getObjective('Bangruende').getScore(pl);
    } else {
        // If the player is not in the objective, return "None"
        return;
    }

    // Return the score of the player from the 'Bangruende' objective
    return test;
}

/**
 * Checkt ob ein Spieler online ist und kann auch von spieler namen auf die Spieler klasse umwandeln.
 * @param {string} pl - Der name von spieler der geprüft werden soll.
 * @returns {Array|Array<boolean>} - Eine Liste die den Spielername und die Spieler Klasse enthält.
 *                                   Wenn der spieler nicht online ist, wird der wert false zurückgegeben.
 *                                   wenn der spieler name nicht gefunden wurde wird ein leerer String zurückgegeben.
 */
export function checkplonline(pl) {
    // Holt sich alle Spieler aus der Welt
    let players = getallplayers();

    try {
        // Sucht den spielern mit dem angegebenen Namen
        let player = players.find((tag) => tag.name.includes(pl));

        // Wenn der Spieler gefunden wurde, return eine Liste mit dem Spielername und dem Spieler als Klasse
        if (pl === player.name) {
            return [pl, player];
        } 
        // Wenn der Spieler Undifind ist wird ein Leerer string zurückgegeben
        else if (player == undefined || player == "undefined") {
            var place = [" "];
        } 
        // Wenn bei der abfrae ein Fehler auftritt wird false zurückgegeben
        else {
            return [false];
        }
    } catch (error) {
        // Wenn vor der abfrage ein fehler auftritt wird nichts zurückegeben
    }
}



initializeScoreboard("banPlayerArray")
initializeScoreboard("banPlayerArraytime")
initializeScoreboardwithcustomname("team", "§cteam")
initializeScoreboard("Bangruende")
initializeScoreboard("mutePlayerArray")
initializeScoreboard("mutePlayerArraytime")
initializeScoreboard("discord")


mc.system.runInterval(() => {
    let milisecons = Date.now()
    let time = dhm(milisecons)
    mc.world.scoreboard.getObjective("s").setScore("s", time[3])
    mc.world.scoreboard.getObjective("s1").setScore("m", time[2])
    mc.world.scoreboard.getObjective("s2").setScore("h", time[1])
    mc.world.scoreboard.getObjective("s3").setScore("d", time[0])
    uhr()




    let pl_list = getallplayers()
    for (let index = 0; index <= pl_list.length; index++) {
        autoban(pl_list[index])
        banlistban(pl_list[index])
        check_mute_time(pl_list[index])



    }
}, 20)

export function set_chat_connection(chat_message) {
    let connected = get_score("discord", "chat")
    if (connected == 1) {
        mc.world.getDimension("overworld").runCommandAsync(`tellraw @a {\"rawtext\":[{\"text\":\"${chat_message}\"}]}`)
    }
}





mc.world.afterEvents.playerSpawn.subscribe((data) => {
    let player = data.player
    onspawnban(data)
    if (data.player.dimension.id == "minecraft:nether") {
        data.player.teleport({ x: 0, y: 98, z: 0 }, "minecraft:nether")
    }
})




mc.world.beforeEvents.chatSend.subscribe((chatdata) => {
    chat(chatdata)

})




mc.world.beforeEvents.playerBreakBlock.subscribe((event) => {
    const player = event.player; // Player that broke the block
    const block = event.block; // Block that's broken
    const dimension = event.dimension.id
    console.log(`user: ${String(event.player.name)} has destroiet: ${block.typeId} at position: ${String(block.x)} , ${String(block.y)} , ${String(block.z)} and in the dimension ${dimension} `)
    const location = event.block.location


});




mc.world.afterEvents.playerPlaceBlock.subscribe((event) => {
    const player = event.player;
    const block = event.block;
    const dimension = event.dimension.id
    console.log(`user: ${String(event.player.name)} has placed: ${block.typeId} at position: ${String(block.x)} , ${String(block.y)} , ${String(block.z)} and in the dimension ${dimension} `)
})


mc.system.afterEvents.scriptEventReceive.subscribe((scriptevent) => {
    let id = scriptevent.id
    let entity = scriptevent.sourceEntity
    let block = scriptevent.sourceBlock
    let message = scriptevent.message
    let ini = scriptevent.initiator
    if (id === "bansystem:bancmd") {
        let splitted = entity.nameTag.split("]§r ")
        ingamebannen(message, splitted[1])
    }
    else if (id === "plotsystem:plotname") {
        const pscore = mc.world.scoreboard.getObjective("m12").getScore(entity)
        const plotx = mc.world.scoreboard.getObjective("x").getScore(entity)
        const plotz = mc.world.scoreboard.getObjective("z").getScore(entity)
        let splitted = entity.nameTag.split("]§r ")
        mc.world.getDimension("overworld").runCommandAsync(`scoreboard players set "/${splitted[1]}" m12 ${pscore}`)
        mc.world.getDimension("overworld").runCommandAsync(`scoreboard players set "/${splitted[1]}" plotx ${plotx - 68}`)
        mc.world.getDimension("overworld").runCommandAsync(`scoreboard players set "/${splitted[1]}" plotz ${plotz - 68}`)
    }
    else if (id === "tag:remove_all_tags") {
        mc.world.sendMessage(`${entity.nameTag} removed all tags , ${ini}`)
        entity.getTags().forEach(tag => entity.removeTag(tag))
    } else if (id === "plotsystem:catch_pl_name") {
        let splitted = message.split("#")
        let x = splitted[0]
        let z = splitted[1]
        let m12_score = splitted[2]
        get_all_objective_element("m12").forEach((element) => {
            if (`${element}`.startsWith("/")) {
                if (get_score("m12", element) == m12_score) {
                    try {
                        entity.onScreenDisplay.setActionBar(`test ${element}`)
                    } catch (error) {
                    }
                }
            }
        })
    } else if (id === "test:test") {
        let tester = get_from_player_all_objective(entity)
        tester.forEach((element) => {
            mc.world.sendMessage(`${element.id}`)
        })
    }


})


mc.world.afterEvents.playerInteractWithBlock.subscribe((event) => {
    const player = event.player;
    const block = event.block;
    let inv_item_list = []

    if (event.block.type.id == "minecraft:chest") {
        const size_of_chest = block.getComponent("minecraft:inventory").container.size
        const inventory = block.getComponent("minecraft:inventory").container
        for (let i = 0; i <= size_of_chest - 1; i++) {
            let invitems_name = "Kein item verfügbar"
            let invitems = inventory.getItem(i)
            if (invitems === undefined) {
                invitems_name = "Kein item verfügbar!"
            } else {
                invitems_name = invitems.typeId
                if(invitems)
                inv_item_list.push(invitems_name)
            }
        }
        mc.world.sendMessage(`user: ${String(event.player.name)} has interacted with: ${block.typeId} at position: ${String(block.x)} , ${String(block.y)} , ${String(block.z)}, with the inventory ${inv_item_list} `)
    }
})


// subscribing to a beforeWatchdogTerminate event
mc.system.beforeEvents.watchdogTerminate.subscribe((event) => {
    event.cancel = true;
    console.log('Canceled critical exception of type ' + event.terminateReason);
    mc.world.sendMessage('Canceled critical exception of type ' + event.terminateReason);
});










