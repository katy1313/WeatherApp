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
                todayTemp.innerHTML = report.current.temperature_2m + " " + report.current_units.temperature_2m;
                const todayHumidity = document.querySelector('.humidity');
                todayHumidity.innerHTML = "Humidity " + report.current.relative_humidity_2m + " " + report.current_units.relative_humidity_2m;
                todayTemp.append(todayHumidity);
                
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
                todayTemp.innerHTML = report.current.temperature_2m + " " + report.current_units.temperature_2m;
                const todayHumidity = document.querySelector('.humidity');
                todayHumidity.innerHTML = "Humidity " + report.current.relative_humidity_2m + " " + report.current_units.relative_humidity_2m;
                todayTemp.append(todayHumidity);
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


                //Displaying units on the button (default)
                const units = document.querySelector('.f_unit');
                units.innerHTML = report.current_units.temperature_2m;

                //Displaying default temp and humidity
                const todayTemp = document.querySelector('.temperature');
                todayTemp.innerHTML = report.current.temperature_2m + " " + report.current_units.temperature_2m;
                const todayHumidity = document.querySelector('.humidity');
                todayHumidity.innerHTML = "humidity " + report.current.relative_humidity_2m + " " + report.current_units.relative_humidity_2m;
                todayTemp.append(todayHumidity);
            })
            .catch(error => {
                console.log(error);
            })

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
    //Displaying reports
    const city = document.querySelector('.city');
    city.innerHTML = report.timezone;

    const hourlyTemp = document.querySelector('.grid');
    const hourlyTempList = document.createElement('ul');
    hourlyTemp.appendChild(hourlyTempList);

    // const hourlyData = document.querySelectorAll('div.grid ul li');
    // hourlyData.innerHTML = report.hourly_units.temperature_2m;


    for (let i=0; i < report.hourly.time.length; i++) {    
        const tempListItem = document.createElement('li');
        hourlyTempList.appendChild(tempListItem);
        const temp = report.hourly.temperature_2m[i];
        let time = report.hourly.time[i];
        let d = new Date(time);
        let hours = d.getUTCHours();
        let minutes = d.getUTCMinutes();
        let formattedTime = `${hours.toString().padStart(2, 0)}:${minutes.toString().padStart(2, 0)}`; 
        tempListItem.innerHTML = `${formattedTime} ${temp}`;
    }
})
.catch(error => {
    console.log(error);
})
