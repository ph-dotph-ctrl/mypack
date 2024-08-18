import * as mc from "@minecraft/server"
import { get_score, getallplayers } from "../main"

function get_settings(player){
    let schalter = get_score("s0", player) // ein oder aus
    let wochentag = get_score("s4", player)
    let von12_auf24h = get_score("s9", player)
    let s11 = get_score("s11", player) // monat tag oder tag monat
    let stunden_für_anzeige = get_score("s2", player)

    return [schalter, s11, von12_auf24h, wochentag, stunden_für_anzeige]
}

export function uhr(){
    
    getallplayers().forEach(player => {
        let settings = get_settings(player)
        let s0 = settings[0]
        let s11 = settings[1]
        let s9 = settings[2]
        let s4 = settings[3]
        let s2 = settings[4]
        if (settings[0] == 0){
            switch(settings[3]){
                case 1:
                    if (settings[1] == 0){
                        if (settings[2] == 0){
                            player.onScreenDisplay.setTitle({translate:"§bSpar§2buch§4: "},{score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Montag"},{text:"\n§b"},{ score:{name:"*",objective:"s2"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{score:{name:"*",objective:"s"}},{text:"\n§e"},{score:{name:"*",objective:"s3"}},{text:"§4:§e"},{score:{name:"*",objective:"s5"}},{text:"§4:§e"},{score:{name:"*",objective:"s6"} } )
                        }else{
                            if (settings[4] <= 0&&settings[4] >= 11){
                                player.onScreenDisplay.setTitle({rawtext:[{translate:"§bSpar§2buch§4: "},{ score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{ score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Montag"},{text:"\n§b"},{ score:{name:"*",objective:"s10"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{ score:{name:"*",objective:"s"}},{text:"§4AM\n§e"},{ score:{name:"*",objective:"s3"}},{text:"§4:§e"},{ score:{name:"*",objective:"s5"}},{text:"§4:§e"},{ score:{name:"*",objective:"s6"}}]})
                            }else if (settings[4] <= 12 && settings[4] >= 23){
                                
                                player.onScreenDisplay.setTitle({rawtext:[{translate:"§bSpar§2buch§4: "},{ score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{ score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Montag"},{text:"\n§b"},{ score:{name:"*",objective:"s10"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{ score:{name:"*",objective:"s"}},{text:"§4PM\n§e"},{ score:{name:"*",objective:"s3"}},{text:"§4:§e"},{ score:{name:"*",objective:"s5"}},{text:"§4:§e"},{ score:{name:"*",objective:"s6"}}]})
                            }
                        }
                    }else{
                        player.onScreenDisplay.setTitle({rawtext:[{translate:"§bSpar§2buch§4: "},{ score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{ score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Montag"},{text:"\n§b"},{ score:{name:"*",objective:"s2"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{ score:{name:"*",objective:"s"}},{text:"\n§e"},{ score:{name:"*",objective:"s5"}},{text:"§4:§e"},{ score:{name:"*",objective:"s3"}},{text:"§4:§e"},{ score:{name:"*",objective:"s6"}}]})
                    }

                    break

                case 2:
                    if (settings[1] == 0){
                        if (settings[2] == 0){
                            player.onScreenDisplay.setTitle({rawtext:[{translate:"§bSpar§2buch§4: "},{ score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{ score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Dienstag"},{text:"\n§b"},{ score:{name:"*",objective:"s2"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{ score:{name:"*",objective:"s"}},{text:"\n§e"},{ score:{name:"*",objective:"s3"}},{text:"§4:§e"},{ score:{name:"*",objective:"s5"}},{text:"§4:§e"},{ score:{name:"*",objective:"s6"}}]})
                        }else{
                            if (settings[4] <= 0&&settings[4] >= 11){
                                player.onScreenDisplay.setTitle({rawtext:[{translate:"§bSpar§2buch§4: "},{ score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{ score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Dienstag"},{text:"\n§b"},{ score:{name:"*",objective:"s10"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{ score:{name:"*",objective:"s"}},{text:"§4AM\n§e"},{ score:{name:"*",objective:"s3"}},{text:"§4:§e"},{ score:{name:"*",objective:"s5"}},{text:"§4:§e"},{ score:{name:"*",objective:"s6"}}]})
                            }else if (settings[4] <= 12 && settings[4] >= 23){
                                player.onScreenDisplay.setTitle({rawtext:[{translate:"§bSpar§2buch§4: "},{ score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{ score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Dienstag"},{text:"\n§b"},{ score:{name:"*",objective:"s10"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{ score:{name:"*",objective:"s"}},{text:"§4PM\n§e"},{ score:{name:"*",objective:"s3"}},{text:"§4:§e"},{ score:{name:"*",objective:"s5"}},{text:"§4:§e"},{ score:{name:"*",objective:"s6"}}]})
                            }
                        }
                    }else{
                        player.onScreenDisplay.setTitle({rawtext:[{translate:"§bSpar§2buch§4: "},{ score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{ score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Dienstag"},{text:"\n§b"},{ score:{name:"*",objective:"s2"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{ score:{name:"*",objective:"s"}},{text:"\n§e"},{ score:{name:"*",objective:"s5"}},{text:"§4:§e"},{ score:{name:"*",objective:"s3"}},{text:"§4:§e"},{ score:{name:"*",objective:"s6"}}]})
                    }
                    break

                case 3:
                    if (settings[1] == 0){
                        if (settings[2] == 0){
                            player.onScreenDisplay.setTitle({rawtext:[{translate:"§bSpar§2buch§4: "},{ score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{ score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Mittwoch"},{text:"\n§b"},{ score:{name:"*",objective:"s2"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{ score:{name:"*",objective:"s"}},{text:"\n§e"},{ score:{name:"*",objective:"s3"}},{text:"§4:§e"},{ score:{name:"*",objective:"s5"}},{text:"§4:§e"},{ score:{name:"*",objective:"s6"}}]})
                        }else{
                            if (settings[4] <= 0&& settings[4] >= 11){
                                player.onScreenDisplay.setTitle({rawtext:[{translate:"§bSpar§2buch§4: "},{ score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{ score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Mittwoch"},{text:"\n§b"},{ score:{name:"*",objective:"s10"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{ score:{name:"*",objective:"s"}},{text:"§4AM\n§e"},{ score:{name:"*",objective:"s3"}},{text:"§4:§e"},{ score:{name:"*",objective:"s5"}},{text:"§4:§e"},{ score:{name:"*",objective:"s6"}}]})
                            }else if (settings[4] <= 12 && settings[4] >= 23){
                                player.onScreenDisplay.setTitle({rawtext:[{translate:"§bSpar§2buch§4: "},{ score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{ score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Mittwoch"},{text:"\n§b"},{ score:{name:"*",objective:"s10"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{ score:{name:"*",objective:"s"}},{text:"§4PM\n§e"},{ score:{name:"*",objective:"s3"}},{text:"§4:§e"},{ score:{name:"*",objective:"s5"}},{text:"§4:§e"},{ score:{name:"*",objective:"s6"}}]})
                            }
                        }
                    }else{
                        player.onScreenDisplay.setTitle({rawtext:[{translate:"§bSpar§2buch§4: "},{ score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{ score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Mittwoch"},{text:"\n§b"},{ score:{name:"*",objective:"s2"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{ score:{name:"*",objective:"s"}},{text:"\n§e"},{ score:{name:"*",objective:"s5"}},{text:"§4:§e"},{ score:{name:"*",objective:"s3"}},{text:"§4:§e"},{ score:{name:"*",objective:"s6"}}]})
                    }
                    break
                case 4:
                    if (settings[1] == 0){
                        if (settings[2] == 0){
                            player.onScreenDisplay.setTitle({rawtext:[{translate:"§bSpar§2buch§4: "},{ score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{ score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Donnerstag"},{text:"\n§b"},{ score:{name:"*",objective:"s2"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{ score:{name:"*",objective:"s"}},{text:"\n§e"},{ score:{name:"*",objective:"s3"}},{text:"§4:§e"},{ score:{name:"*",objective:"s5"}},{text:"§4:§e"},{ score:{name:"*",objective:"s6"}}]})
                        }else{
                            if (settings[4] <= 0&&settings[4] >= 11){
                                player.onScreenDisplay.setTitle({rawtext:[{translate:"§bSpar§2buch§4: "},{ score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{ score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Donnerstag"},{text:"\n§b"},{ score:{name:"*",objective:"s10"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{ score:{name:"*",objective:"s"}},{text:"§4AM\n§e"},{ score:{name:"*",objective:"s3"}},{text:"§4:§e"},{ score:{name:"*",objective:"s5"}},{text:"§4:§e"},{ score:{name:"*",objective:"s6"}}]})
                            }else if (settings[4] <= 12 && settings[4] >= 23){
                                player.onScreenDisplay.setTitle({"rawtext":[{translate:"§bSpar§2buch§4: "},{ score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{ score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Donnerstag"},{text:"\n§b"},{ score:{name:"*",objective:"s10"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{ score:{name:"*",objective:"s"}},{text:"§4PM\n§e"},{ score:{name:"*",objective:"s3"}},{text:"§4:§e"},{ score:{name:"*",objective:"s5"}},{text:"§4:§e"},{ score:{name:"*",objective:"s6"}}]})
                            }
                        }
                    }else{
                        player.onScreenDisplay.setTitle({rawtext:[{translate:"§bSpar§2buch§4: "},{ score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{ score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Donnerstag"},{text:"\n§b"},{ score:{name:"*",objective:"s2"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{ score:{name:"*",objective:"s"}},{text:"\n§e"},{ score:{name:"*",objective:"s5"}},{text:"§4:§e"},{ score:{name:"*",objective:"s3"}},{text:"§4:§e"},{ score:{name:"*",objective:"s6"}}]})
                    }
                    break

                case 5:
                    if (settings[1] == 0){
                        if (settings[2] == 0){
                            player.onScreenDisplay.setTitle({rawtext:[{translate:"§bSpar§2buch§4: "},{score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Freitag"},{text:"\n§b"},{score:{name:"*",objective:"s2"}},{text:"§4:§b"},{score:{name:"*",objective:"s1"}},{text:"§4:§b"},{score:{name:"*",objective:"s"}},{text:"\n§e"},{score:{name:"*",objective:"s3"}},{text:"§4:§e"},{score:{name:"*",objective:"s5"}},{text:"§4:§e"},{score:{name:"*",objective:"s6"}}]})
                        }else{
                            if (settings[4] <= 0&&settings[4] >= 11){
                                player.onScreenDisplay.setTitle({rawtext:[{translate:"§bSpar§2buch§4: "},{ score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{ score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Freitag"},{text:"\n§b"},{ score:{name:"*",objective:"s10"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{ score:{name:"*",objective:"s"}},{text:"§4AM\n§e"},{ score:{name:"*",objective:"s3"}},{text:"§4:§e"},{ score:{name:"*",objective:"s5"}},{text:"§4:§e"},{ score:{name:"*",objective:"s6"}}]})
                            }else if (settings[4] <= 12 && settings[4] >= 23){
                                player.onScreenDisplay.setTitle({rawtext:[{translate:"§bSpar§2buch§4: "},{ score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{ score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Freitag"},{text:"\n§b"},{ score:{name:"*",objective:"s10"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{ score:{name:"*",objective:"s"}},{text:"§4PM\n§e"},{ score:{name:"*",objective:"s3"}},{text:"§4:§e"},{ score:{name:"*",objective:"s5"}},{text:"§4:§e"},{ score:{name:"*",objective:"s6"}}]})
                            }
                        }
                    }else{
                        player.onScreenDisplay.setTitle({rawtext:[{translate:"§bSpar§2buch§4: "},{ score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{ score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Freitag"},{text:"\n§b"},{ score:{name:"*",objective:"s2"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{ score:{name:"*",objective:"s"}},{text:"\n§e"},{ score:{name:"*",objective:"s5"}},{text:"§4:§e"},{ score:{name:"*",objective:"s3"}},{text:"§4:§e"},{ score:{name:"*",objective:"s6"}}]})
                    }
                    break

                case 6:
                    if (settings[1] == 0){
                        if (settings[2] == 0){
                            player.onScreenDisplay.setTitle({rawtext:[{translate:"§bSpar§2buch§4: "},{ score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{ score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Samstag"},{text:"\n§b"},{ score:{name:"*",objective:"s2"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{ score:{name:"*",objective:"s"}},{text:"\n§e"},{ score:{name:"*",objective:"s3"}},{text:"§4:§e"},{ score:{name:"*",objective:"s5"}},{text:"§4:§e"},{ score:{name:"*",objective:"s6"}}]})
                        }else{
                            if (settings[4] <= 0&&settings[4] >= 11){
                                player.onScreenDisplay.setTitle({rawtext:[{translate:"§bSpar§2buch§4: "},{ score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{ score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Samstag"},{text:"\n§b"},{ score:{name:"*",objective:"s10"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{ score:{name:"*",objective:"s"}},{text:"§4AM\n§e"},{ score:{name:"*",objective:"s3"}},{text:"§4:§e"},{ score:{name:"*",objective:"s5"}},{text:"§4:§e"},{ score:{name:"*",objective:"s6"}}]})
                            }else if (settings[4] <= 12 && settings[4] >= 23){
                                player.onScreenDisplay.setTitle({rawtext:[{translate:"§bSpar§2buch§4: "},{ score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{ score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Samstag"},{text:"\n§b"},{ score:{name:"*",objective:"s10"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{ score:{name:"*",objective:"s"}},{text:"§4PM\n§e"},{ score:{name:"*",objective:"s3"}},{text:"§4:§e"},{ score:{name:"*",objective:"s5"}},{text:"§4:§e"},{ score:{name:"*",objective:"s6"}}]})
                            }
                        }
                    }else{
                        player.onScreenDisplay.setTitle({rawtext:[{translate:"§bSpar§2buch§4: "},{ score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{ score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Samstag"},{text:"\n§b"},{ score:{name:"*",objective:"s2"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{ score:{name:"*",objective:"s"}},{text:"\n§e"},{ score:{name:"*",objective:"s5"}},{text:"§4:§e"},{ score:{name:"*",objective:"s3"}},{text:"§4:§e"},{ score:{name:"*",objective:"s6"}}]})
                    }
                    break
                case 7:
                    if (settings[1] == 0){
                        if (settings[2] == 0){
                            player.onScreenDisplay.setTitle({rawtext:[{translate:"§bSpar§2buch§4: "},{ score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{ score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Sonntag"},{text:"\n§b"},{ score:{name:"*",objective:"s2"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{ score:{name:"*",objective:"s"}},{text:"\n§e"},{ score:{name:"*",objective:"s3"}},{text:"§4:§e"},{ score:{name:"*",objective:"s5"}},{text:"§4:§e"},{ score:{name:"*",objective:"s6"}}]})
                        }else{
                            if (settings[4] <= 0&&settings[4] >= 11){
                                player.onScreenDisplay.setTitle({rawtext:[{translate:"§bSpar§2buch§4: "},{ score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{ score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Sonntag"},{text:"\n§b"},{ score:{name:"*",objective:"s10"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{ score:{name:"*",objective:"s"}},{text:"§4AM\n§e"},{ score:{name:"*",objective:"s3"}},{text:"§4:§e"},{ score:{name:"*",objective:"s5"}},{text:"§4:§e"},{ score:{name:"*",objective:"s6"}}]})
                            }else if (settings[4] <= 12 && settings[4] >= 23){
                                player.onScreenDisplay.setTitle({rawtext:[{translate:"§bSpar§2buch§4: "},{ score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{ score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Sonntag"},{text:"\n§b"},{ score:{name:"*",objective:"s10"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{ score:{name:"*",objective:"s"}},{text:"§4PM\n§e"},{ score:{name:"*",objective:"s3"}},{text:"§4:§e"},{ score:{name:"*",objective:"s5"}},{text:"§4:§e"},{ score:{name:"*",objective:"s6"}}]})
                            }
                        }
                    }else{
                        player.onScreenDisplay.setTitle({rawtext:[{translate:"§bSpar§2buch§4: "},{ score:{name:"*",objective:"m1"}},{text:"\n§d"},{translate:"Eigenes Plot"},{text:"§4:§1 "},{ score:{name:"*",objective:"m12"}},{text:"\n\n§a"},{translate:"Sonntag"},{text:"\n§b"},{ score:{name:"*",objective:"s2"}},{text:"§4:§b"},{ score:{name:"*",objective:"s1"}},{text:"§4:§b"},{ score:{name:"*",objective:"s"}},{text:"\n§e"},{ score:{name:"*",objective:"s5"}},{text:"§4:§e"},{ score:{name:"*",objective:"s3"}},{text:"§4:§e"},{ score:{name:"*",objective:"s6"}}]})
                    }
                    break

            }

        }else{
            player.onScreenDisplay.setTitle("")
        }
    })
}
