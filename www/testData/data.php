<?php
define('INC', true);
include('mysql2.php');
$db = new db();

function getPGC($k, $type='GP', $filter='') {
	$type = strtoupper($type);
	switch($type) {
		case 'G': $var = &$_GET; break;
		case 'P': $var = &$_POST; break;
		case 'C': $var = &$_COOKIE; break;
		default:
			if(isset($_GET[$k])) {
				$var = &$_GET;
			} else {
				$var = &$_POST;
			}
			break;
	}
	return isset($var[$k]) ? (
		empty($filter) ? (
			is_array($var[$k]) ? array_map('htmlspecialchars', $var[$k]) : htmlspecialchars($var[$k]) 
		) : $var[$k]
	) : NULL;
}


$index = getPGC('index');


$sql       = 'SELECT * FROM z_post limit '. ($index)*10 .','. ($index+1)*10;

$allSql    = 'SELECT * FROM z_post';
$rows      = $db->fetch_array_all($sql);
$total     = $db->num_rows($allSql);
$arr = array('rows' => $rows, 'total' => $total);
$json = json_encode($arr);

echo($json);
die();







$json = '{"rows":[
{"post_id":"1","title":"\u6b22\u8fce\u4f7f\u7528 aroot2","slug":"hello-aroot2","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"2","title":"\u6b22\u8fce\u4f7f\u7528 aroot21","slug":"hello-aroot21","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"3","title":"\u6b22\u8fce\u4f7f\u7528 aroot22","slug":"hello-aroot22","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"4","title":"\u6b22\u8fce\u4f7f\u7528 aroot23","slug":"hello-aroot23","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"5","title":"\u6b22\u8fce\u4f7f\u7528 aroot24","slug":"hello-aroot24","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},

{"post_id":"6","title":"\u6b22\u8fce\u4f7f\u7528 aroot25","slug":"hello-aroot25","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"7","title":"\u6b22\u8fce\u4f7f\u7528 aroot26","slug":"hello-aroot26","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},

{"post_id":"8","title":"\u6b22\u8fce\u4f7f\u7528 aroot27","slug":"hello-aroot27","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"9","title":"\u6b22\u8fce\u4f7f\u7528 aroot28","slug":"hello-aroot28","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"},
{"post_id":"10","title":"\u6b22\u8fce\u4f7f\u7528 aroot29","slug":"hello-aroot29","author":"1","description":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","content":"\u5982\u679c\u60a8\u770b\u5230\u8fd9\u7bc7\u6587\u7ae0,\u8868\u793a\u60a8\u7684 aroot2 \u5df2\u7ecf\u5b89\u88c5\u6210\u529f.","thumb":null,"type":"1","updataTime":"0"}
],"total":90}';


echo($json);
?>