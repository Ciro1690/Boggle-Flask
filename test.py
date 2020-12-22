from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):
    def test_display_board(self):
        """Test if homepage loads with 200 status code and Boggle title is displayed"""
        with app.test_client() as client:
            resp = client.get('/')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Boggle</h1>',html)

    def test_session_info(self):
        """Test that high score is initialized in session with value of 0 """
        with app.test_client() as client:
            resp = client.get("/")

            self.assertEqual(resp.status_code, 200)
            self.assertEqual(session['high-score'], 0)

    def test_session_board(self):
        """Test that new game initializes board in the session """
        with app.test_client() as client:
            resp = client.get("/newgame")

            self.assertEqual(resp.status_code, 200)
            self.assertIn('board', session)
