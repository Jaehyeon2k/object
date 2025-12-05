package p251002데이터베이스쿼리;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.*;
public class aba {

	public static void main(String[] args) {
		
		// 1. JDBC 드라이버 적재
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
		// 마리아 DB Class.forName("org.mariadb.jdbc.Driver");
		
		//2. 데이터 베이스 연결
		Connection conn;
		String url = "jdbc:oracle:thin:@10.30.3.96:1521:orcl";
		String user = "c##2101056";
		String pw = "p2101056";
		conn = DriverManager.getConnection(url,user,pw);
		System.out.println("데이터베이스 연결 성공");

		// 3.Statement 객체를 생성 (SQL을 실행하기 위하여)
		java.sql.Statement stmt;
		stmt = conn.createStatement();
		
		// 4. SQL문을 실행시킨다.
		String sql = "select * from books"; // sql문에 세미콜론 x
		ResultSet rs;
		rs = stmt.executeQuery(sql);
		
		// 5. ResultSet 객체에서 각 레코드를 가져와서 출력한다.
		// ResultSet에서 첫번째 레코드를 커서가 가리키게 한다.
		while (rs.next()) {
		// book_id
		int bookID;
		bookID = rs.getInt("book_id");
		System.out.print("BookID = " + bookID);
		// title
		String title;
		title = rs.getString("title");
		System.out.println("  title = " + title);
		
		
			
		}
		
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

}
