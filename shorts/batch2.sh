F=/tmp/claude-0/-home-user-mora/7bef8db5-47a0-5c26-8307-972ba2796889/scratchpad/fonts
until grep -q BATCH_DONE shorts/batch.log; do sleep 10; done
run(){ python3 pipeline/shorts/make_short.py shorts/specs.json $1 $2 $F shorts/out 2>&1 | tail -1; }
for id in j3_sumo j4_torii j5_ise c3_ho c4_dotsach l2_rong l3_bienmat g2_kumbh g3_quyen; do run $id vi & run $id en & wait; done
echo BATCH2_DONE
