from flask import Flask, request, render_template, redirect, flash, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"

debug = DebugToolbarExtension(app)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

boggle_game = Boggle()


@app.route('/')
def display_board():
    """Display game board"""
    board = boggle_game.make_board()
    session['board'] = board
    return render_template("board.html", board=board)


@app.route('/submit-guess', methods=["POST"])
def handle_guess():
    """Determine if word entered is valid word"""
    return redirect('/')
