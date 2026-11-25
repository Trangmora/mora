F=/tmp/claude-0/-home-user-mora/7bef8db5-47a0-5c26-8307-972ba2796889/scratchpad/fonts
run(){ python3 pipeline/shorts/make_short.py shorts/specs.json $1 $2 $F shorts/out 2>&1 | tail -1; }
for id in c1_hocphi c2_cholacnha l1_thuocsung g1_shiva j1_amaterasu j2_thanthicu; do run $id vi & run $id en & wait; done
echo BATCH_DONE
