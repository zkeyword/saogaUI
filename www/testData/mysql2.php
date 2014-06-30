<?php
if(!defined("INC")) exit("Request Error!");

class db{
	private $conn   = null;           //数据库连接
	private $dbName = null;           //数据库名

	/*初始化*/
	public function __construct($host='', $user='', $pw='', $dbName=''){
		if( empty($host) ){
			$host   = 'localhost';
			$user   = 'root';
			$pw     = '1';
			$dbName = 'aroot2';
		}
		$this->conn = mysql_connect($host, $user, $pw) or die("Can't connect MySQL server(". $host .")!");
		mysql_select_db($dbName) or die(mysql_error());
		mysql_query("set names utf8;");
		$this->dbName = $dbName;
	}

	/*注销连接*/
	public function __destruct(){
		if( $this->conn ){
			$this->conn = null;
		}
	}

	/*
	 * 执行SQL语句
	 * @param {string} 要执行的sql语句
	 * @return {object|boolean}
	 */
	public function query($sql, $debug=false){
		if($debug){
			return print_r($sql);
		}
		return mysql_query($sql, $this->conn);
	}

	/*
	 * 插入
	 * @param {string} 表名
	 * @param {array} 插入表的数据
	 * @param {boolean} debug
	 */
	public function insert($table, $values, $debug=false){
		$k = '';
		$v = '';
		$table = table($table);
		foreach($values as $key=>$value){
			$k .= $k ? ",`$key`" : "`$key`";
			$v .= $v ? ",'$value'" : "'$value'";  //值用的是单引号
		}
		$sql = "INSERT INTO `$table` ($k) VALUES ($v);";
		if($debug){
			return print_r($sql);
		}
		$this->query($sql);
	}

	/*
	 * 修改(支持多表)
	 * @param {string} 表名,多表用‘,’逗号隔开
	 * @param {array} 插入表的数据
	 * @param {string} 修改数据的条件
	 * @param {boolean} debug
	 */
	public function update($table, $values, $condition, $debug=false){
		$v     = '';
		$str   ='';
		$table = explode(",", $table);
		foreach ($table as $value) {
			$str .= table($value);
		}
		foreach($values as $key=>$value){
			$v .= $v ? " ,`$key`='$value'" : "`$key`='$value'";
		}
		$sql = "UPDATE `$str` SET $v WHERE $condition;";
		if($debug){
			return print_r($sql);
		}
		$this->query($sql);
	}

	/*
	 * 删除
	 * @param {string} 表名
	 * @param {string} 修改数据的条件
	 * @param {boolean} debug
	 */
	public function delete($table, $condition, $debug=false){
		$table = table($table);
		if($condition){
			$sql = "DELETE FROM `$table` WHERE $condition;";
		}else{
			$sql = "DELETE FROM $table;";
		}
		if($debug){
			return print_r($sql);
		}
		$this->query($sql);
	}
	
	/**
	 * 从结果集中取得一行作为对象
	 * @param {string}
	 * @return {object}
	 */
	public function fetch_object($sql){
		$query = $this->query($sql);
		if($query){
			return mysql_fetch_object($query);
		}
		return false;
	}
	
	/**
	 * 从结果集中取得一行作为关联数组或数字数组
	 * @param {string}
	 * @param {sting} 返回结果，默认关联数组
	 * @return {boolean|array}
	 */
	public function fetch_array($sql, $type = MYSQL_ASSOC){
		$query = $this->query($sql);
		if($query){
			return mysql_fetch_array($query, $type);
		}
		return false;
	}
	
	/**
	 * 从结果集中取得一行作为数字索引数组
	 * @param {string}
	 * @return {boolean|array}
	 */
	public function fetch_row($sql) {
		$query = $this->query($sql);
		if($query){
			return mysql_fetch_row($query);
		}
		return false;
	}
	
	/**
	 * 取得行的数目
	 * @param {string}
	 * @return {number}
	 */
	public function num_rows($sql) {
		$query = $this->query($sql);
		if($query){
			return mysql_num_rows($query);
		}
		return false;
	}
	
	public function fetch_array_all($sql, $type = MYSQL_ASSOC){
		$query = $this->query($sql);
		$array = array();
		$i = 0;
		if($query){
			while( $row = mysql_fetch_array($query, $type) ) {
				$array[$i] = $row;
				$i++;
			}
			return $array;
		}
		return false;
	}
	
	/**
	 * 取得结果集中字段的数目
	 * @param {string}
	 * @return {number}
	 */
	public function num_fields($sql) {
		$query = $this->query($sql);
		if($query){
			return mysql_num_fields($query);
		}
		return false;
	}
	
	/**
	 * 取得上一步 INSERT 操作产生的 ID
	 * @return {number}
	 */
	public function insert_id(){
		return mysql_insert_id($this->conn);
	}
	
	/**
	 * 获取mysql错误
	 * @return {string}
	 */
	public function error(){
		return mysql_error();
	}

    /**
	 * 获取mysql错误编码
	 * @return {number}
	 */
	public function errno(){
		return mysql_errno();
	}
	
	/**
	 * 取得数据库版本信息
	 */
	public function mysqlVersion(){
		return mysql_get_server_info();
	}
		
	/**
	 * 优化表
	 * @param {string}
	 */
	public function optimize($table){
		$table = table($table);
		$sql   = "OPTIMIZE TABLE `$table`;";
		$query = $this->query($sql);
	}
	
	/**
	 * 修复表
	 * @param {string}
	 */
	public function repair($table){
		$table = table($table);
		$sql   = "REPAIR TABLE `$table`;";
		$query = $this->query($sql);
	}
}

?>