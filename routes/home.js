var express = require('express');
var router = express.Router();
const Board = require('../models/board')
const User = require('../models/User')
const List = require('../models/list')
const Card = require('../models/card')
const auth =  require('../modules/middlewares')

/* GET home page. */

// dashboard display
router.get('/',auth.verifyToken, function(req, res, next) {
    User.findById(req.userId)
    .populate("boardsCreated")
    .exec((err, boards)=>{
        if(err) return next(err);
        res.json({boards})
    })
    // Board.find({},(err, boards)=>{
    //     // console.log(boards)
    //     if(err) return next(err)
    //     res.json({boards});
    // })
  
});


// getting a board create form
// router.get('/board/create',(req, res, next)=>{
//     res.render('createBoardForm')
// })

// creating a board
router.post('/board/create',auth.verifyToken,(req, res, next)=>{
    let id = req.userId
    User.findById(id,(err, user)=>{
        if(err) return next(err)
        req.body.createdBy = user.id
        Board.create(req.body,(err,createdBoard)=>{
            if(err) return next(err)
            user.boardsCreated.push(createdBoard.id)
            user.save()
            // res.render('home',{board:createdBoard})
            // res.redirect('/home')
            res.json({ success: true, createdBoard });
            // res.render('singleBoard',{board:createdBoard})
        })
    })
   
})  


// for displaying a single board
// router.get('/board/:boardId/view',(req, res, next)=>{
//     Board.findById(req.params.boardId,(err, board)=>{
//         if(err) return next(err)

//         res.render("board",{board})
//     })
// })

// router.get('/board/:boardId/view',(req, res, next)=>{
//     Board.findById(req.params.boardId)
//     .populate("lists cards",["title","createdBy"])
//     .exec((err,board)=>{

//         // console.log(res.locals.cards)
//         res.render("board",{board})
//     })
// })
router.get('/board/:boardId/view',(req, res, next)=>{
    Board.findById(req.params.boardId)
    .populate({
        path:"lists",
        populate:{
            path:"cardId"
        }
    }).exec((err, board)=>{
        if(err) return next(err)
        res.json({board})
    })
})

// creating a list
// getting the list form
// router.get('/:boardId/list/create',(req, res, next)=>{
//     let boardId = req.params.boardId
//     res.render("listCreateForm",{boardId})
// })

// saving the details of the list form  on the database and redirecting to the route which will display them
router.post('/:boardId/list/create',auth.verifyToken,(req, res, next)=>{
    let id = req.userId
    User.findById(id,(err, user)=>{
        if(err) return next(err)
        req.body.createdBy = user.id
        Board.findById(req.params.boardId,(err, board)=>{
            if(err) return next(err);
            req.body.boardId = board.id
            List.create(req.body,(err, list)=>{
                if(err) return next(err)
                // Board.findByIdAndUpdate(req.params.boardId,{$push:{lists:list}},(err,updBoard)=>{
                Board.findById(req.params.boardId,(err,foundBoard)=>{
                    if(err) return next(err)
                    foundBoard.lists.push(list.id);
                    foundBoard.save()
                    // console.log(foundBoard)
                    // res.redirect(`/home/board/${foundBoard.id}/view`)
                    // res.json({"updatedBoard":foundBoard})
                    //made the below changes for showing list created instead of updated Board
                    res.json({"listCreated":list, "updatedBoard":foundBoard})
                })
                // if(err) return next(err)
                // res.json({list,updBoard})
            })  
        })
    })
    
})

// creating a card

// router.get('/list/:listId/card',(req, res, next)=>{
//     let listId = req.params.listId
//     res.render("createCardForm",{listId})
// })

router.post('/list/:listId/card', auth.verifyToken,(req, res, next)=>{
   
    let userId = req.userId
    let listId = req.params.listId
    User.findById(userId,(err, user)=>{
        if(err) return next(err)
        req.body.createdBy = user.id
        req.body.listId = listId
        List.findById(listId,(err, list)=>{
            if(err) return next(err)
            let boardId = list.boardId
            req.body.boardId = boardId
            Card.create(req.body,(err,card)=>{
                if(err) return next(err)
                list.cardId.push(card._id)
                list.save()
                Board.findById(boardId,(err, updatedBoardWithCard)=>{
                    if(err) return next(err)
                    updatedBoardWithCard.cards.push(card._id)
                    updatedBoardWithCard.save()
                    res.json({"updatedBoardWithCard":updatedBoardWithCard,"createdCard":card})
                })
           
                // res.redirect(`/home/board/${boardId}/view`)
                
            })

        })
    })
})
module.exports = router;