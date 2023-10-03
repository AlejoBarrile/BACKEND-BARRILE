
    import express from "express"
    import productsRouter from "./routes/productsRouter.mjs";
    import cartsRouter from "./routes/cartsRouter.mjs";
    import { Server } from 'socket.io';
    import handlebars from 'express-handlebars';
    import __dirname from "./utils.mjs";
    import router from "./routes/view.routes.mjs";


    // SERVER CONFIG
    const app =   express();
    const puerto = 8070;
    const httpServer = app.listen(puerto, () => {
    console.log(`Server listening on port ${puerto}`)});

    const io = new Server(httpServer);

    // HANDLEBARS CONFIG
    app.engine("handlebars", handlebars.engine())
    app.set("views", __dirname + "/views")
    app.set("view engine", "handlebars")

    // EXPRESS CONFIG
    app.use(express.static(__dirname+ "/public"));

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json())

    //ROUTES CONFIG
    app.use("/api/products/", productsRouter)
    app.use("/api/carts/", cartsRouter)
    app.use("/", router)
    app.use((req, res, next) => {
        req.io = io;
        next();
      });


    // Configuración de Socket.io
    io.on('connection', (socket) => {
    console.log('Cliente conectado');
        socket.on("message", data =>{
            console.log(data)
        })

    });
