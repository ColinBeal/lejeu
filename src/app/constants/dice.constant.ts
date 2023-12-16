import { DiceFaceNames, EvadeEffectsIDs, MoneyEffectsIDs, MultiplierEffectsIDs, ShieldEffectsIDs, WeaponEffectsIDs, XEffectsIDs } from "../interfaces/dice.interface";

export const EvadeEffectsLabels: {[key in EvadeEffectsIDs]: string} = {
  'EVD1': 'Need 2 Evade faces',
  'EVD2': 'Evade +10%',
  'EVD3': 'Evade +25%',
  'EVD4': 'Evade +40%',
  'EVD5': 'Evade +55%',
  'EVD6': 'Evade +65% for 2 turns',
  'EVD7': 'Evade +75% for 2 turns, full accurate shots',
  'EVD8': 'Evade +80% for 2 turns, full accurate shots, escape window',
  'EVD9': 'Evade 100% for 3 turns, full accurate shots, escape window',
}

export const MoneyEffectsLabels: {[key in MoneyEffectsIDs]: string} = {
  'MON1': 'Need 2 Money faces',
  'MON2': 'Money +5%',
  'MON3': 'Money +15%',
  'MON4': 'Money +25%',
  'MON5': 'Money +45%',
  'MON6': 'Money +75%',
  'MON7': 'Money +100%',
  'MON8': 'Money +200%',
  'MON9': 'Money +500%',
}

export const MultiplierEffectsLabels: {[key in MultiplierEffectsIDs]: string} = {
  'MUL1': 'Need 2 Multiplier faces',
  'MUL2': 'Multiplier x1.25',
  'MUL3': 'Multiplier x1.5',
  'MUL4': 'Multiplier x2',
  'MUL5': 'Multiplier x3',
  'MUL6': 'Multiplier x4',
  'MUL7': 'Multiplier x6',
  'MUL8': 'Multiplier x8',
  'MUL9': 'Multiplier x10',
}

export const WeaponEffectsLabels: {[key in WeaponEffectsIDs]: string} = {
  'WEA1': 'Need 2 Weapon faces',
  'WEA2': 'Damage +50%',
  'WEA3': 'Damage +100%',
  'WEA4': 'Damage +150%, double shots',
  'WEA5': 'Damage +250%, double shots',
  'WEA6': 'Damage +350%, double shots',
  'WEA7': 'Damage +450%, double shots',
  'WEA8': 'Damage +500%, triple shots, full reload',
  'WEA9': 'Damage +1000%, triple shots, full reload',
}

export const ShieldEffectsLabels: {[key in ShieldEffectsIDs]: string} = {
  'SHD1': 'Need 2 Shield faces',
  'SHD2': 'Shield regen 10% of max',
  'SHD3': 'Shield regen 30% of max',
  'SHD4': 'Shield regen 70% of max',
  'SHD5': 'Shield regen 100% of max',
  'SHD6': 'Shield regen 150% of max, 25% dmg reduction',
  'SHD7': 'Shield regen 200% of max, 45% dmg reduction',
  'SHD8': 'Shield regen 300% of max, 65% dmg reduction',
  'SHD9': 'Shield regen 500% of max, 90% dmg reduction',
}

export const XEffectsLabels: {[key in XEffectsIDs]: string} = {
  'X1': 'Warning !',
  'X2': 'Warning !!!',
  'X3': 'DANGER !',
  'X4': 'Instantly skips turn',
  'X5': 'Instantly skips turn',
  'X6': 'Instantly skips turn, +50% damage taken',
  'X7': 'Instantly skips turn, +125% damage taken',
  'X8': 'Instantly skips turn, +200% damage taken',
  'X9': 'Instantly destroys enemy',
}

export const EffectsLabel: {[key in DiceFaceNames]: {[key: string]: string}} = {
  'EVD': EvadeEffectsLabels,
  'MON': MoneyEffectsLabels,
  'X':   XEffectsLabels,
  'WEA': WeaponEffectsLabels,
  'SHD': ShieldEffectsLabels,
  'SPC': MultiplierEffectsLabels
}
