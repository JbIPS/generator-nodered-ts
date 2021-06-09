import test from 'ava';
import helper from 'node-red-node-test-helper';
import { Node, NodeMessage } from 'node-red';
import <%= nodename %> from './<%= nodename %>_node';

test.beforeEach(() => new Promise((resolve) => {
	helper.startServer(resolve);
}));
test.afterEach(async () => {
	await helper.unload();
	await new Promise((resolve) => {
	helper.stopServer(() => resolve(null));
	});
})

test.serial("node registration", async (t) => {
  const flow = [{ id: "n1", type: "<%= nodename %>", name: "test name" }];
  await helper.load(<%= nodename %>, flow, {});
  const n1 = helper.getNode("n1");
	t.is(n1.name, "test name");
});

test.serial("process node", async (t) => {
  const flow = [
    {
      id: "n1",
      type: "<%= nodename %>",
      name: "test name",
      wires: [["n2"]]
    },
    { id: "n2", type: "helper" }
  ];
  await helper.load(<%= nodename %>, flow, {});
	const n1: Node = helper.getNode("n1");
	const n2: Node = helper.getNode("n2");
	const check = new Promise(resolve => {
		n2.on("input", function (msg: NodeMessage) {
			resolve(t.is(msg.payload, "MIXED CASE"));
		});
	});
	n1.receive({ payload: "Mixed Case" });
	await check;
});
