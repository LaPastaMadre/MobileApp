@echo off
set senchaCmd=E:\Sencha\Cmd\Sencha\Cmd\4.0.2.67
set destination=E:\Sencha\LaPastaMadre
set source=C:\Users\Denis Ironi\Documents\Aptana Studio 3 Workspace\MobileApp\www\resources
echo Copia file app.scss
xcopy "%source%\sass\app.scss" "%destination%\resources\sass\" /y
echo Compilazione Scss
sencha compass compile "%destination%\resources\sass"
echo Copia file app.css
xcopy "%destination%\resources\css\app.css" "%source%\css\" /y