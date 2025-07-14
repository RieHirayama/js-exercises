function counter(){
    let n = 0;
    return {
        count: function(){ return n++;},
        reset: function(){ n = 0; }
    }
}

export function counterGroup() {
  const counters = [];

  return {
    newCounter() {
      let n = 0;

      const counter = {
        count() {
          return n++;
        },
        reset() {
          n = 0;
        },
        getValue() {
          return n;
        }
      };

      counters.push(counter);
      return counter;
    },

    total() {
      return counters.reduce((sum, c) => sum + c.getValue(), 0);
    },

    average() {
      if (counters.length === 0) {
        throw new TypeError("カウンタが1つも存在しません");
      }
      return this.total() / counters.length;
    },

    variance() {
      if (counters.length < 2) {
        throw new TypeError("カウンタが2つ未満です");
      }
      const avg = this.average();
      return (
        counters.reduce((sum, c) => {
          const diff = c.getValue() - avg;
          return sum + diff * diff;
        }, 0) / counters.length
      );
    }
  };
}
