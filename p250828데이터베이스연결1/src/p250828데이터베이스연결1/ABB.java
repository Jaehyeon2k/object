package p250828데이터베이스연결1;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class ABB {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		try {
			// 1. JDBC 드라이버 적재
			Class.forName("oracle.jdbc.driver.OracleDriver");
			
			// 2. 데이터베이스 연결
			String url = "jdbc:oracle:thin:@10.30.3.96:1521:orcl";
			String user = "c##2101056";
			String pw = "p2101056";
			Connection con = DriverManager.getConnection(url, user, pw);
			System.out.println("데이터베이스 연결 성공");
			
			// 3. Statement 객체를 생성 ( SQL을 실하기 위하여)
			Statement stmt = con.createStatement();
			
			String sql = "insert into books (book_id, title) values (6, 'ABA')";
			// 4. SQL문을 실행시킨다.
			int result = stmt.executeUpdate(sql);
			
			System.out.println("영향을 받은 행의 갯수 : " + result);
			
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
