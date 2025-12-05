package p250923;

public class p0923_1 {

	public static void main(String[] args) {
		Integer obj = new Integer(128);
		byte b = obj.byteValue(); // byte > -128 ~ 127 
		System.out.println(b);
		
		int i = Integer.parseInt("123");
		System.out.println(Integer.toBinaryString(10));
	}

}
