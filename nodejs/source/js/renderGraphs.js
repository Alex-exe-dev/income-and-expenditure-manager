const graph = document.getElementById('myChart');


var lineGraph = new Chart(graph, {
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
            borderColor:'cyan',
        }]
    },
    options:{
        plugins:{
            title: {
                display: true,
                text: 'Gesamter Verlauf',
                font:{
                    size: 100,
                    family: 'SansitaSwashed'
                },
                padding:{
                    top: 50,
                    bottom: 15
                },
                color: 'white'
              }
        }

    }
});

