// Creating fetch
fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&timezone=America%2FNew_York&models=gfs_seamless")
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