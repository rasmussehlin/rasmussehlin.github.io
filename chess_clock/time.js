var topActive = false;
var minutesTop = 5;
var secondsTop = 0;
var minutesBottom = 5;
var secondsBottom = 0;
var haveWinner = false;

function Start()
{
	if(haveWinner == true)
	{
		minutesTop = 5;
		secondsTop = 0;
		minutesBottom = 5;
		secondsBottom = 0;
		haveWinner = false;

		ResetToStart();
	}
	else
	{
		ShowDivider(false);
		setTimeout(Play, 1000);
	}
}

function Play()
{
	if (topActive)
	{
		if (secondsTop == 0)
		{
			if (minutesTop != 0)
			{
				minutesTop--;
				secondsTop = 59;
			}
		}
		else
		{
			secondsTop--;
		}

		if (secondsTop < 10)
		{
			pTop.innerHTML = "0" + minutesTop.toString() + ":0" + secondsTop.toString();
		}
		else
		{
			pTop.innerHTML = "0" + minutesTop.toString() + ":" + secondsTop.toString();
		}

		if (secondsTop == 0 && minutesTop == 0)
		{
			haveWinner = true;
		}
	}
	else
	{
		if (secondsBottom == 0)
		{
			if(minutesBottom != 0)
			{
				minutesBottom--;
				secondsBottom = 59;
			}
		}
		else
		{
			secondsBottom--;
		}

		if (secondsBottom < 10)
		{
			pBottom.innerHTML = "0" + minutesBottom.toString() + ":0" + secondsBottom.toString();	
		}
		else
		{
			pBottom.innerHTML = "0" + minutesBottom.toString() + ":" + secondsBottom.toString();
		}

		if(secondsBottom == 0 && minutesBottom == 0)
		{
			haveWinner = true;
		}
	}

	if (haveWinner == false)
	{
		setTimeout(Play, 1000);
		console.log("TOP: " + minutesTop.toString() + ":" + secondsTop.toString() + " BOTTOM: " + minutesBottom.toString() + ":" + secondsBottom.toString());
	}
	else
	{
		if (topActive)
		{
			pTop.innerHTML = "LOSER";
		}
		else
		{
			pBottom.innerHTML = "LOSER";
		}

		PlaySound();
		document.getElementById("start").innerHTML = "RESET";
		ShowDivider(true);
	}
}

function ShowDivider(show)
{
	if (show)
	{
		document.getElementById("divider").style['height'] = "10%";
		document.getElementById("start").style['opacity'] = 1;
		document.getElementById("divider").style['border-width'] = 5;
	}
	else
	{
		document.getElementById("divider").style['height'] = 0;
		document.getElementById("start").style['opacity'] = 0;
		document.getElementById("divider").style['border-width'] = 0;
	}
}

function ChangeActive(sentFrom)
{
	if(haveWinner == false)
	{
		if (sentFrom == "top")
		{
			topActive = false;
			document.getElementById("top").style['boxShadow'] = "0px 0px 30px 0px inset";
			pTop.style.color = "silver";

			document.getElementById("bottom").style['boxShadow'] = "";
			pBottom.style.color = "black";
			
		}
		else
		{
			topActive = true;
			document.getElementById("bottom").style['boxShadow'] = "0px 0px 30px 0px inset";
			pBottom.style.color = "silver";

			document.getElementById("top").style['boxShadow'] = "";
			pTop.style.color = "black";
		}
	}
}

function FixStartPoint()
{
	var	pTop = document.getElementById("pTop");
	var	pBottom = document.getElementById("pBottom");
	document.getElementById("top").style['boxShadow'] = "0px 0px 30px 0px inset";
}

function ResetToStart()
{	
	setTimeout(function(){

		document.getElementById("start").style['opacity'] = 0;
		setTimeout(function()
		{
			document.getElementById("start").innerHTML = "START";
			document.getElementById("start").style['opacity'] = 1;
		}, 500);


		pTop.style['opacity'] = 0;
		setTimeout(function()
		{
			pTop.innerHTML = "0" + minutesTop + ":0" + secondsTop;
			pTop.style['opacity'] = 1;
		}, 500);

		pBottom.style['opacity'] = 0;
		setTimeout(function()
		{
			pBottom.innerHTML = "0" + minutesBottom + ":0" + secondsBottom;
			pBottom.style['opacity'] = 1;
		}, 500);

	}, 0); 
}

function PlaySound()
{	
	var sound = document.getElementById("sound");
	sound.play();
}