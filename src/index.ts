import './LoadEnv'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';

// Start the server
const stdin = process.openStdin();
stdin.addListener("data", (d) => {
    d = d.toString().trim();
    switch(d) {
        case("uptime"):
            console.log(process.uptime());
            break;
        default:
            console.log("There is no such command!");
            break;
    }
})
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
