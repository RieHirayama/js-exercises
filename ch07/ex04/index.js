const data = [
    { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
    { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
    { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
    { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
    { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
    { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
    { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
    { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
    { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

// mathの全員の合計点
const totalMath = data.reduce((sum, student) => sum + student.math, 0);
console.log("mathの合計点:", totalMath); // 530


// クラスAのchemistryの平均点
const classAStudents = data.filter(s => s.class === "A");
const avgChemA = classAStudents.reduce((sum, s) => sum + s.chemistry, 0) / classAStudents.length;
console.log("クラスAのchemistry平均点:", avgChemA); // 45


// 3科目合計点のクラスC内での平均点
const classC = data.filter(s => s.class === "C");
const avgTotalC = classC
  .map(s => s.math + s.chemistry + s.geography)
  .reduce((sum, total) => sum + total, 0) / classC.length;
console.log("クラスCの3科目合計平均:", avgTotalC); // 176.66666666666666


// 3科目合計点が最も高い人のname
const topStudent = data
  .map(s => ({ name: s.name, total: s.math + s.chemistry + s.geography }))
  .reduce((max, s) => s.total > max.total ? s : max);
console.log("最高得点者:", topStudent.name); // Frank


// 全体のgeographyの標準偏差(標準偏差 = √(∑(x - 平均)² / n))
const geos = data.map(s => s.geography);
const avgGeo = geos.reduce((sum, v) => sum + v, 0) / geos.length;
const stdGeo = Math.sqrt(
  geos.map(v => (v - avgGeo) ** 2).reduce((sum, d2) => sum + d2, 0) / geos.length
);
console.log("geographyの標準偏差:", stdGeo); // 22.3330569358242

// # 実行結果
// mathの合計点: 530
// クラスAのchemistry平均点: 45
// クラスCの3科目合計平均: 176.66666666666666
// 最高得点者: Frank
// geographyの標準偏差: 22.3330569358242
