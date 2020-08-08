module.exports = (err,req,res,next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // res.sendStatus(err.status || 500);
  res.status(err.status || 500);
  res.json({
    status: 'error',
    error: err.message
  });
};
