//the async await used in the index.js file if very common format and is used almost everywhere. Hence we generally use a wapper where that code is written and we wrap it wherever required

const asyncHandler = (requestHandler)=>{
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err)=>next(err))
    }
}



export {asyncHandler}

//in (req,res) actually four variables are passed (err, req, res, next) : next is for middlewares
// const asyncHandler = (fn)=> async (req, res, next) =>{
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }  //we are accenpting a function and passing it to another function (Higher order function)