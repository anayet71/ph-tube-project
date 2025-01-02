// const isVerified = 5

// // if(isVerified){
// //     console.log('user is verified')
// // }
// // else{
// //     console.log('not verified')
// // }

// console.log(`${isVerified > 0 ? "user is verified": "not verified"}`)

function getTimeString (time){
    const hour = parseInt(time / 3600);
    const minute = time % 60
    return `${hour} hrs ago ${minute} min ago`
}
console.log(getTimeString(546999))