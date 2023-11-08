function _1(md){return(
md`# Strong baseline`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _constellationNames(){return(
[
  "牡羊座", "金牛座", "雙子座", "巨蟹座",
  "獅子座", "處女座", "天秤座", "天蠍座",
  "射手座", "摩羯座", "水瓶座", "雙魚座"
]
)}

function _transformedData(data,constellationNames){return(
data.map(d => ({
  ...d,
  ConstellationName: constellationNames[d.Constellation],
  Gender: d.Gender
}))
)}

function _5(Plot,constellationNames,transformedData){return(
Plot.plot({
  color: {legend: true},
  x: {grid: true, label: "ConstellationName →", ticks: 10, tickFormat: (d) => constellationNames[d]},
  y: {grid: true, label: "Count"},
  marks: [
    Plot.rectY(transformedData,
      Plot.binX(
        {y: "Count"},
        {
          x: "Constellation",
          fill: "Gender",
          title: (data) => `ConstellationName: ${data.ConstellationName}\nGender: ${data.Gender}`,
          interval: 1,
          tip: true,
        },
      ),
    ),    
  ]
})
)}

function _SortedByConstellationData(){return(
[]
)}

function _7(SortedByConstellationData,data,constellationNames)
{
  SortedByConstellationData.length = 0;
  
  data.forEach ( x => {
    let constellation = constellationNames[x.Constellation];
    let gender = x.Gender === "男" ? "male" : "female"
    let index = SortedByConstellationData.findIndex((NewData) => NewData.Constellation === constellation && NewData.Gender === gender);
    
    if (index == -1) {
      let NewData = {
        ConstellationNumber: x.Constellation,
        Constellation: constellation,
        Gender: gender,
        Count: 1
      };
      SortedByConstellationData.push(NewData);
    } 
      
    else {
      SortedByConstellationData[index].Count += 1;
    }
  });
  
  return SortedByConstellationData;
}


function _8(Plot,SortedByConstellationData){return(
Plot.plot({
  grid: true,
  color: {legend: true},
  y: {label: "Count"},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(SortedByConstellationData, {
      x: "Constellation",
      y: "Count",
      fill: "Gender",
      channels: {
        ConstellationNumber: "ConstellationNumber",
      },
      tip: {
        format: {
          y: (d) => `: ${d}`,
          x: (d) => `: ${d}`,
          fill: (d) => `: ${d}`,
          ConstellationNumber: false
        }
      },
      sort: {x: "ConstellationNumber"}
    }),
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("constellationNames")).define("constellationNames", _constellationNames);
  main.variable(observer("transformedData")).define("transformedData", ["data","constellationNames"], _transformedData);
  main.variable(observer()).define(["Plot","constellationNames","transformedData"], _5);
  main.variable(observer("SortedByConstellationData")).define("SortedByConstellationData", _SortedByConstellationData);
  main.variable(observer()).define(["SortedByConstellationData","data","constellationNames"], _7);
  main.variable(observer()).define(["Plot","SortedByConstellationData"], _8);
  return main;
}
