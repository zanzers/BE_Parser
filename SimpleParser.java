
public class SimpleParser {
	static String exampleInput = "2*(3+4)";
	
	int count = 0;
	final String input;
	
	SimpleParser(String input) {
		this.input = input;
	}
	
	
	class Result {
		int num; // result calculated so far
		int pos; // input position parsed so far
		Result(int num, int pos) {
			this.num = num;
			this.pos = pos;
		}
	}

	@SuppressWarnings("serial")
	class Fail extends Exception {
		Fail() { super() ; }
		Fail(String s) { super(s) ; }
	}

	public static void main(String[] args) {
		SimpleParser parser = new SimpleParser(exampleInput);
		System.out.println(exampleInput + " -> " + parser.eval());
		System.err.println(Integer.toString(parser.count) + " steps");
	}
	
	/**
	 * Utility method to keep track of how many steps we have performed.
	 */
	void say(String msg) {
		System.err.println(msg);
		count++;
	}

	String eval() {
		try {
			return Integer.toString(this.Goal(0).num);
		} catch (Fail e) {
			return "Cannot parse input!";
		}
	}

	protected Result Goal(int pos) throws Fail {
		Result result = this.add(pos);
		this.eof(result.pos);
		return result;
	}

	
	protected Result add(int pos) throws Fail {
		try {
			say("Add <- Mul + Add");
			Result lhs = this.mul(pos);
			Result op = this.eatChar('+', lhs.pos);
			Result rhs = this.add(op.pos);
			return new Result(lhs.num+rhs.num, rhs.pos);
		} catch(Fail ex) { }
		say("Add <- Mul [BACKTRACK]");
		return this.mul(pos);
	}

	protected Result mul(int pos) throws Fail {
		try {
			say("Mul <- Prim * Mul");
			Result lhs = this.prim(pos);
			Result op = this.eatChar('*', lhs.pos);
			Result rhs = this.mul(op.pos);
			return new Result(lhs.num * rhs.num, rhs.pos);
		} catch(Fail ex) { }
		say("Mul <- Prim [BACKTRACK]");
		return this.prim(pos);
	}

	protected Result prim(int pos) throws Fail {
		try {
			say("Prim <- ( Add )");
			Result lpar = this.eatChar('(', pos);
			Result exp = this.add(lpar.pos);
			Result rpar = this.eatChar(')', exp.pos);
			return new Result(exp.num, rpar.pos);
		} catch(Fail ex) { }
		say("Prim <- Dec [BACKTRACK]");
		return this.dec(pos);
	}

	protected Result eatChar(char c, int pos) throws Fail {
		say("Char " + Character.toString(c));
		if (pos >= input.length()) {
			// say("FAIL");
			throw new Fail(); // eof
		}
		if (input.charAt(pos) == c) {
			return new Result(c - '0', pos+1);
		}
		// say("FAIL");
		throw new Fail();
	}

	protected Result eof(int pos) throws Fail {
		say("Eof");
		if (pos >= input.length()) {
			return new Result(0, pos+1);
		}
		throw new Fail();
	}

	protected Result dec(int pos) throws Fail {
		say("Dec <- Num");
		try { return eatChar('0', pos); } catch(Fail ex) { }
		try { return eatChar('1', pos); } catch(Fail ex) { }
		try { return eatChar('2', pos); } catch(Fail ex) { }
		try { return eatChar('3', pos); } catch(Fail ex) { }
		try { return eatChar('4', pos); } catch(Fail ex) { }
		try { return eatChar('5', pos); } catch(Fail ex) { }
		try { return eatChar('6', pos); } catch(Fail ex) { }
		try { return eatChar('7', pos); } catch(Fail ex) { }
		try { return eatChar('8', pos); } catch(Fail ex) { }
		return eatChar('9', pos);
	}
}
