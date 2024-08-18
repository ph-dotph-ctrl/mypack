import * as mc from "@minecraft/server"
import { invseebypass } from "./data/bypass";
import { enchantmentlist } from "./data/enchantments";
export function invsee(pl, plsender){
    let bypass_invsee = invseebypass()
    bypass_invsee.forEach(element => {
        if (element === pl.name){
            return
        }
    });
    let inv = pl.getComponent('inventory').container
    let inv_sender = plsender.getComponent('inventory').container
    for (let i = 0; i <= 35; i++) {
        let invitems_name = "Kein item verfügbar"
        let invitems = inv.getItem(i)
        if (invitems === undefined){
            invitems_name = "Kein item verfügbar!"
        }
        else {
            invitems_name = invitems.typeId
            mc.world.getDimension('overworld').runCommandAsync(`tellraw @a[name="${plsender.name}"] {"rawtext":[{"translate":"items.${invitems_name}", "with":["§5", "${i}"]}]}`)
            if (invitems.hasComponent('minecraft:enchantments') == true ) {
                invitems.getComponent('enchantable').getEnchantments().forEach((en) => {
                    mc.world.getDimension('overworld').runCommandAsync(`tellraw @a[name="${plsender.name}"] {"rawtext":[{"translate":"enchantments.${en.type.Id}", "with":["§5", "${en.level}"]}]}`)
                })
                return
            }
        }   
    }
}


