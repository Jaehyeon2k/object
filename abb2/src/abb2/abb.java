package abb2;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class abb {

	public static void main(String[] args) {
		// 1. JDBC 드라이버 적재
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			
		String url = "jdbc:oracle:thin:@10.30.3.96:1521:orcl";
		String user = "c##2101056";
		String pw = "p2101056";
			// 2. 데이터베이스 연결
			Connection con = DriverManager.getConnection(url, user, pw);
			
			System.out.println("데이터베이스 연결 성공");
			// 3. Statement 객체를 생성 (SQL을 실행하기 위하여)
			
			Statement stmt = con.createStatement();
			
			// 4. SQL문을 실행 시킨다.
			String sql = "delete from books where book_id = 1";
			int result = stmt.executeUpdate(sql);
			
			System.out.println("영향을 받은 행의 갯수 = " + result);
			
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
