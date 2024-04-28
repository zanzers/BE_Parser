

public class SimplePackrat extends SimpleParser {
	Hashtable<Integer,Result>[] hash;
	final int ADD = 0;
	final int MUL = 1;
	final int PRIM = 2;
	final int HASHES = 3;
	
	@SuppressWarnings("unchecked")
	SimplePackrat (String input) {
		super(input);
		hash = new Hashtable[HASHES];
		for (int i=0; i<hash.length; i++) {
			hash[i] = new Hashtable<Integer,Result>();
		}
	}

	public static void main(String[] args) {
		SimplePackrat parser = new SimplePackrat(exampleInput);
		System.out.println(exampleInput + " -> " + parser.eval());
		System.err.println(Integer.toString(parser.count) + " steps");
	}

	protected Result add(int pos) throws Fail {
		if (!hash[ADD].containsKey(pos)) {
			hash[ADD].put(pos, super.add(pos));
		} else {
			say("ADD -- retrieving hashed result");
		}
		return hash[ADD].get(pos);
	}

	protected Result mul(int pos) throws Fail {
		if (!hash[MUL].containsKey(pos)) {
			hash[MUL].put(pos, super.mul(pos));
		} else {
			say("MUL -- retrieving hashed result");
		}
		return hash[MUL].get(pos);
	}

	protected Result prim(int pos) throws Fail {
		if (!hash[PRIM].containsKey(pos)) {
			hash[PRIM].put(pos, super.prim(pos));
		} else {
			say("PRIM -- retrieving hashed result");
		}
		return hash[PRIM].get(pos);
	}

}
