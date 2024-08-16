export enum RaceType {
  Human = 'Human',
  Elf = 'Elf',
  Dwarf = 'Dwarf',
  HalfOrc = 'HalfOrc',
  HalfElf = 'HalfElf',
  Demon = 'Demon',
  Angel = 'Angels',
}

export interface Race {
  raceType: RaceType;
}