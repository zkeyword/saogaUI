

@echo off

:menu
echo   _____________________________________________
echo  ^|                                            ^|
echo  ^|   ���Ȱ�װ npm install -g less ����        ^|
echo  ^|             lessѹ������                   ^|
echo  ^|                                            ^|
echo  ^|     0 - normal          1 - compress       ^|
echo  ^|____________________________________________^|
set /p input=-^> ��ѡ��:

echo.
if "%input%"== "0" goto normal
if "%input%"== "1" goto compress
goto end

:normal
	lessc ../www/less/styles.less > ../www/css/styles.css
goto end

:compress
	lessc ../www/less/styles.less > ../www/css/styles.css --clean-css
goto end

:end
prompt
popd

