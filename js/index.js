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
                
                //Displaying units on the button
                const units = document.querySelector('.c_unit');
                units.innerHTML = report.current_units.temperature_2m;

                 //Displaying reports
                const todayTemp = document.querySelector('.temperature');
                const todayHumidity = document.querySelector('.humidity');
                todayTemp.innerHTML = report.current.temperature_2m + " " + report.current_units.temperature_2m;
                todayHumidity.innerHTML = "humidity" + report.current.relative_humidity_2m + report.current_units.relative_humidity_2m;
                todayTemp.append(todayHumidity);
                
            })
            .catch(error => {
                console.log(error);
            })

            //Calling endpoint to return hourly temp in ºC and humidity
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
                //const list = document.querySelector("#hourly > div > ul"); // The old list
                const hourlyTemp = document.querySelector('.grid'); 
                const hourlyTempListC = document.createElement('ul'); // The new list

                for (let i = 0; i < report.hourly.time.length; i++) {    
                    const tempListItem = document.createElement('li');
                    hourlyTempListC.appendChild(tempListItem);
                    
                    const temp = report.hourly.temperature_2m[i];
                    let time = report.hourly.time[i];
                    let d = new Date(time);
                    let hours = d.getUTCHours();
                    let minutes = d.getUTCMinutes();
                    
                    let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`; 
                    tempListItem.innerHTML = `${formattedTime} ${temp}ºC`;
}
                hourlyTemp.innerHTML = ''; // Removes all old list items
                hourlyTemp.appendChild(hourlyTempListC);
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
            
                // Displaying units on the button
                const units = document.querySelector('.f_unit');
                units.innerHTML = report.current_units.temperature_2m;

                //Displaying reports
                const todayTemp = document.querySelector('.temperature');
                const todayHumidity = document.querySelector('.humidity');
                todayTemp.innerHTML = report.current.temperature_2m + " " + report.current_units.temperature_2m;
                todayHumidity.innerHTML = "humidity" + report.current.relative_humidity_2m + report.current_units.relative_humidity_2m;
                todayTemp.append(todayHumidity);
            })
            .catch(error => {
                console.log(error);
            })

            //Calling endpoint to return hourly temp in ºF and humidity
            fetch("https://api.open-meteo.com/v1/forecast?latitude=27.907&longitude=-82.6909&hourly=temperature_2m&temperature_unit=fahrenheit&timezone=America%2FNew_York&forecast_days=1&models=gfs_seamless")
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
        
                getDefaultHourlyTemp();
            })
            .catch(error => {
                console.log(error);
            })
        })
    }  
}

// Displaying city, default current temp and the hourly temperature in Fahrenheit

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

        //Displaying reports
        const city = document.querySelector('.city');
        city.innerHTML = report.timezone;
        
        //Displaying units on the button (default)
        const units = document.querySelector('.f_unit');
        units.innerHTML = report.current_units.temperature_2m;

        //Displaying default temp and humidity
        const todayTemp = document.querySelector('.temperature');
        todayTemp.innerHTML = report.current.temperature_2m + " " + report.current_units.temperature_2m;
        const todayHumidity = document.querySelector('.humidity');
        todayHumidity.innerHTML = "humidity " + report.current.relative_humidity_2m + " " + report.current_units.relative_humidity_2m;
        todayTemp.append(todayHumidity);

        getDefaultHourlyTemp();

        //Displaying default hourly temperature and time
        
    })
    .catch(error => {
        console.log(error);
    })     

//Displaying 7 day forecast

fetch("https://api.open-meteo.com/v1/forecast?latitude=27.907&longitude=-82.6909&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&temperature_unit=fahrenheit&timezone=America%2FNew_York&models=gfs_seamless")
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
    
})
.catch(error => {
    console.log(error);
})

// Functions
function getDefaultHourlyTemp(unit) {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=27.907&longitude=-82.6909&hourly=temperature_2m&temperature_unit=fahrenheit&timezone=America%2FNew_York&forecast_days=1&models=gfs_seamless")
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

    const hourlyTemp = document.querySelector('.grid');
    const hourlyTempList = document.createElement('ul');
    

    for (let i=0; i < report.hourly.time.length; i++) {    
        const tempListItem = document.createElement('li');
        hourlyTempList.appendChild(tempListItem);
        const temp = report.hourly.temperature_2m[i];
        let time = report.hourly.time[i];
        let d = new Date(time);
        let hours = d.getUTCHours();
        let minutes = d.getUTCMinutes();
        let formattedTime = `${hours.toString().padStart(2, 0)}:${minutes.toString().padStart(2, 0)}`; 
        tempListItem.innerHTML = `${formattedTime} ${temp}ºF`;
    }

    hourlyTemp.innerHTML = '';
    hourlyTemp.appendChild(hourlyTempList);

})
    .catch(error => {
    console.log(error);
})
    
}



