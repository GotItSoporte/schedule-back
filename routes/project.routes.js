const express = require( 'express' );
// controller
const Projectcontroller = require( '../controllers/project.controller');
// midllewares
const md_auth = require( '../middlewares/ensureAuthenticated' );
// validation
const { check } = require( 'express-validator' );
const api =  express.Router();
// create 
api.post( "/create",
  [
    check( 'name', 'El nombre es del proyecto obligatorio' ).notEmpty(),
    check( 'company', 'El nombre de la compañia obligatorio' ).notEmpty(),
    check( 'hoursTotal', 'El # de horas totales es obligatorio' ).notEmpty(),
  ],
  [ md_auth.ensureAuth,
    md_auth.isAdmin
  ], 
  Projectcontroller.create
);

// get projects
api.get( "/",
  Projectcontroller.getProyects
);

// get 
api.get( "/:id",
  Projectcontroller.get
);

// get  tasks from project
api.get( "/:id/tasks",
  Projectcontroller.getTasks
);

// update 
api.put( "/update/:id",
  [ md_auth.ensureAuth,
    md_auth.isAdmin
  ], 
  Projectcontroller.update 
);
// delete 
api.delete( "/:id",
  [ md_auth.ensureAuth,
    md_auth.isAdmin
  ], 
  Projectcontroller.deleteOne
);
// to do get Members ...


module.exports= api;