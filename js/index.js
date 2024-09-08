//Switching between units

let btns = document.querySelectorAll('button');
for(btn of btns) {
    if (btn.innerHTML === 'Cº') {
        btn.addEventListener('click', function () {
            fetch("https://api.open-meteo.com/v1/forecast?latitude=27.907&longitude=-82.6909&current=temperature_2m,relative_humidity_2m,is_day,precipitation&timezone=America%2FNew_York&forecast_days=1&models=gfs_seamless")
            .then(response => {
                if(!response.ok) {
                    throw new Error("Not Found");
                }
                return response.json();
            })
            .then(report => {
                if(report.length === 0) {
                    throw new Error("No report exist");
                } else {
                    console.log(report);
                } 
                
                const units = document.querySelector('.c_unit');
                units.innerHTML = report.current_units.temperature_2m;

                 //Displaying reports
                const today = document.querySelector('#today');
                const todayData = today.querySelector('p');
                todayData.innerHTML = report.current.temperature_2m + " " + report.current_units.temperature_2m;
                
            })
            .catch(error => {
                console.log(error);
            })
        })
    } else if (btn.innerHTML === 'F'){
        btn.addEventListener('click', function () {
            fetch("https://api.open-meteo.com/v1/forecast?latitude=27.907&longitude=-82.6909&current=temperature_2m,relative_humidity_2m,is_day,precipitation&temperature_unit=fahrenheit&timezone=America%2FNew_York&forecast_days=1&models=gfs_seamless")
            .then(response => {
                if(!response.ok) {
                    throw new Error("Not Found");
                }
                return response.json();
            })
            .then(report => {
                if(report.length === 0) {
                    throw new Error("No report exist");
                } else {
                    console.log(report);
                } 
            
                const units = document.querySelector('.f_unit');
                units.innerHTML = report.current_units.temperature_2m;

                //Displaying reports
                const today = document.querySelector('#today');
                const todayData = today.querySelector('p');
                todayData.innerHTML = report.current.temperature_2m + " " + report.current_units.temperature_2m;
            })
            .catch(error => {
                console.log(error);
            })
        })
    }
    
}

// Displaying city, default current temp and the hourly temperature

fetch("https://api.open-meteo.com/v1/forecast?latitude=27.907&longitude=-82.6909&current=temperature_2m,relative_humidity_2m,is_day,precipitation&temperature_unit=fahrenheit&timezone=America%2FNew_York&forecast_days=1&models=gfs_seamless")
            .then(response => {
                if(!response.ok) {
                    throw new Error("Not Found");
                }
                return response.json();
            })
            .then(report => {
                if(report.length === 0) {
                    throw new Error("No report exist");
                } else {
                    console.log(report);
                } 
            
                const units = document.querySelector('.f_unit');
                units.innerHTML = report.current_units.temperature_2m;

                //Displaying reports
                const today = document.querySelector('#today');
                const todayData = today.querySelector('p');
                todayData.innerHTML = report.current.temperature_2m + " " + report.current_units.temperature_2m;
            })
            .catch(error => {
                console.log(error);
            })

fetch("https://api.open-meteo.com/v1/forecast?latitude=27.907&longitude=-82.6909&hourly=temperature_2m&timezone=America%2FNew_York&forecast_days=1&models=gfs_seamless")
.then(response => {
    if(!response.ok) {
        throw new Error("Not Found");
    }
    return response.json();
})
.then(report => {
    if(report.length === 0) {
        throw new Error("No report exist");
    } else {
        console.log(report);
    } 
    //Displaying reports
    const city = document.querySelector('.city');
    city.innerHTML = report.timezone;
    const hourlyTemp = document.querySelector('.grid');
    hourlyTemp.innerHTML = (report.hourly.temperature_2m).join(" ");
})
.catch(error => {
    console.log(error);
})




// const fButton = document.querySelector('.f_unit');
// fButton.addEventListener('click', ()=>{
//     fetch("https://api.open-meteo.com/v1/forecast?latitude=27.907&longitude=-82.6909&current=temperature_2m,relative_humidity_2m,is_day,precipitation&temperature_unit=fahrenheit&timezone=America%2FNew_York&forecast_days=1&models=gfs_seamless")
//     .then(response => {
//         if(!response.ok) {
//             throw new Error("Not Found");
//         }
//         return response.json();
//     })
//     .then(report => {
//         if(report.length === 0) {
//             throw new Error("No report exist");
//         } else {
//             console.log(report);
//         } 
//         //Displaying reports
//         const city = document.querySelector('.city');
//         city.innerHTML = report.timezone;
    
//         const units = document.querySelector('.f_unit');
//         units.innerHTML = report.hourly_units.temperature_2m;
//     })
//     .catch(error => {
//         console.log(error);
//     })
// })


// fetch("https://api.open-meteo.com/v1/forecast?latitude=27.907&longitude=-82.6909&current=temperature_2m,relative_humidity_2m,is_day,precipitation&timezone=America%2FNew_York&forecast_days=1&models=gfs_seamless")
// .then(response => {
//     if(!response.ok) {
//         throw new Error("Not Found");
//     }
//     return response.json();
// })
// .then(forecast => {
//     if(forecast.length === 0) {
//         throw new Error("No forecast exist");
//     } else {
//         console.log(forecast);
//     } 
//     //Displaying reports
//     const today = document.querySelector('#today');
//     const todayData = today.querySelector('p');
//     todayData.innerHTML = forecast.current.temperature_2m;
// })
// .catch(error => {
//     console.log(error);
// })