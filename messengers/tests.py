import time
async def f():
    time.sleep(3)
    return 'a'
def f1():
    time.sleep(3)
    return 'a'
def test1(f):
    t = ''
    for i in range(4):
        t += f()
    return t
async def test(f):
    global res
    for i in range(4):
        res += await f()
now = time.time()
res = ''
test(f)
print(res)
t = time.time() - now
now = time.time()
res = test1(f1)
print(res)
t1 = time.time() - now
print(t, t1)
