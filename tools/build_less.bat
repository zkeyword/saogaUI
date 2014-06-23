

@echo off

:menu
echo   _____________________________________________
echo  ^|                                            ^|
echo  ^|   请先安装 npm install -g less 工具        ^|
echo  ^|             less压缩工具                   ^|
echo  ^|                                            ^|
echo  ^|     0 - normal          1 - compress       ^|
echo  ^|____________________________________________^|
set /p input=-^> 请选择:

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

