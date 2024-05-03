export class Circle12 {
  private notes: string[] = [];

  static scale = [
    '"C"C',
    '"C#"^C',
    '"D"D',
    '"D#"^D',
    '"E"E',
    '"F"F',
    '"F#"^F',
    '"G"G',
    '"G#"^G',
    '"A"A',
    '"A#"^A',
    '"B"B',
  ];

  constructor() {
    const list = this._shuffle(Circle12.scale);
    console.log('Circle12: generated', list);

    for (let i = 0; i < 12; ++i) {
      this.notes.push(list[i]);
    }
  }

  getAll(): string {
    return this.notes.join('');
  }

  getNInRow(items: number): string {
    let result = [];
    let group: string[] = [];

    for (let i = 0; i < 12; ++i) {
      if (i % items === 0 && i > 0) {
        result.push(group);
        group = [];
      }

      this._checkPush(group, this.notes[i]);
    }

    if (group.length > 0) {
      result.push(group);
    }

    return result.map(e => e.join('')).join(' | ');
  }

  getEveryN(every: number): string {
    let result: string[][] = [];

    for (let i = 0; i < 12; ++i) {
      const index = i % every;

      if (result[index] === undefined) {
        result[index] = [];
      }

      this._checkPush(result[index], this.notes[i]);
    }

    return result.map(e => e.join('')).join(' | ');
  }

  // Check for accident in previous note that can affect this one in the bar
  private _checkPush(arr: string[], item: string) {
    if (arr.length === 0) {
      arr.push(item);
      return;
    }

    const last = arr.slice(-1)[0];
    const lastHasAccd = last.indexOf('#') > 0;
    const lastNote = last.replace(/[#^]/g, '');
    const curNote = item.replace(/[#^]/g, '');

    console.log('Checking', {lastHasAccd, lastNote, curNote, last, item});

    if (lastHasAccd && lastNote === curNote) {
      const letter = item[item.length - 1];
      console.log('GOT ONE', item);
      item = item.substring(0, item.length - 1) + '=' + letter;
      console.log('MAPPED', item);
    }

    arr.push(item);
  }

  // Shuffles array randomly
  private _shuffle(arr: string[]) {
    let array = [...arr];
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
}
