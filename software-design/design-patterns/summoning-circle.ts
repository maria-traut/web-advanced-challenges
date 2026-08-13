interface Creature {
  name: string;
  useAbility(): void; // method that prints a message what the creature does
}

class Dragon implements Creature {
  name: string; // Deklaration: Es gibt ein Feld "name" vom Typ "string".
  constructor() {
    this.name = "Dragon"; // // Zuweisung: "Der Wert von "name" ist jetzt "Dragon".
  }
  useAbility(): void {
    console.log(`${this.name} breathes fire.`);
  }
}

class Phoenix implements Creature {
  name: string;
  constructor() {
    this.name = "Phoenix";
  }
  useAbility(): void {
    console.log(`${this.name} rises from the ashes.`);
  }
}

class Unicorn implements Creature {
  name: string;
  constructor() {
    this.name = "Unicorn";
  }
  useAbility(): void {
    console.log(`${this.name} dances on a rainbow.`);
  }
}

class SummoningCircle {
  // "container" for summon method, no constructor needed, nothing to be saved
  summon(ingredientType: string): Creature {
    switch (ingredientType) {
      case "fire":
        return new Dragon();
      case "air":
        return new Phoenix();
      case "sparkles":
        return new Unicorn();
      default:
        throw new Error(`Unknown ingredient: ${ingredientType}`);
    }
  }
}

const summoningCircle = new SummoningCircle();

const firstCircle = summoningCircle.summon("fire");
firstCircle.useAbility(); // "Dragon breathes fire."

const secondCircle = summoningCircle.summon("air");
secondCircle.useAbility(); // "Phoenix rises from the ashes."

const thirdCircle = summoningCircle.summon("sparkles");
thirdCircle.useAbility(); // "Unicorn dances on a rainbow."
