module.exports.register = async (req,res)=>{ res.json({msg:'register endpoint (seeded)'}); };
module.exports.login = async (req,res)=>{ res.json({token:'demo-token', user:{email:req.body.email||'demo'}}); };
module.exports.me = async (req,res)=>{ res.json({user:{email:'demo'}}); };
