const { validateResult }= requre("express-validator");

module.exports = (req,res,next)=>{
    const errors= validateResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }
    next();
};