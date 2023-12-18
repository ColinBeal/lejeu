export interface DiceInterface {symbol: DiceFaceNames, locked: boolean};

export type DiceFaceNames = 'EVD' | 'WEA'| 'X' | 'SHD' | 'SPC' | 'MON';
export type EvadeEffectsIDs = 'EVD1' | 'EVD2' | 'EVD3'| 'EVD4' | 'EVD5' | 'EVD6' | 'EVD7' | 'EVD8' | 'EVD9';
export type MoneyEffectsIDs = 'MON1' |'MON2' | 'MON3'| 'MON4' | 'MON5' | 'MON6' | 'MON7' | 'MON8' | 'MON9';
export type MultiplierEffectsIDs = 'MUL1' |'MUL2' | 'MUL3'| 'MUL4' | 'MUL5' | 'MUL6' | 'MUL7' | 'MUL8' | 'MUL9';
export type WeaponEffectsIDs = 'WEA1' | 'WEA2' | 'WEA3'| 'WEA4' | 'WEA5' | 'WEA6' | 'WEA7' | 'WEA8' | 'WEA9';
export type ShieldEffectsIDs = 'SHD1' |'SHD2' | 'SHD3'| 'SHD4' | 'SHD5' | 'SHD6' | 'SHD7' | 'SHD8' | 'SHD9';
export type XEffectsIDs = 'X1' | 'X2' | 'X3' |  'X4' | 'X5' | 'X6' | 'X7' | 'X8' | 'X9';
export type EffectIds = WeaponEffectsIDs |
MultiplierEffectsIDs |
ShieldEffectsIDs |
XEffectsIDs |
EvadeEffectsIDs |
MoneyEffectsIDs


export interface DiceEffect {
    effectId: EffectIds,
    type: DiceFaceNames,
    value: number
}
