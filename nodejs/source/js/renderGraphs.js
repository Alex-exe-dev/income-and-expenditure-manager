let graph1 = document.getElementById("myChart");

let lineGraph = new Chart(graph1, {
    type:'line',
    data:{
        labels:['25.02.2021', '30.02.2021', '01.03.2021', '06.03.2021', '10.03.2021'],
        datasets:[{
            label:'Gesamtes Geld',
            data:[
                5000,
                5900,
                5700,
                4000,
                2000
            ],
            backgroundColor:'cyan',
            borderColor:'cyan'
        }]
    },
    options:{}
});
