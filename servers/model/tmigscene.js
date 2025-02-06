import mondb from '../db/dbconn.js';

const tmigscene = {
    /**
     * 이행 우측 이행 전광판
     * PieChart
     */
    ttransbolist : async (args) => {
      //console.log("args.query.asisdt : " + args.query.mid);      
      let rows = await mondb.query(` with timg_tot as 
                                        (select x.mid		as mid
                                            , x.wstat 		as wstat
                                            , x.cnt 		as cnt
                                            , y.scenario 	as scenario
                                        from (select a.mid			as mid
                                                , a.wstat 			as wstat
                                                , count(a.ActStdt)	as cnt
                                                from tmigscene a
                                                where a.mid = ?
                                                group by a.mid, a.wstat
                                            ) x
                                        join tmigcode y
                                            on x.mid = y.mid)
                                    , timg as 
                                        (select x.mid		as mid
                                            , x.scgrp 		as scgrp
                                            , x.wstat 		as wstat
                                            , x.cnt 		as cnt
                                            , y.scenario 	as scenario
                                        from (select a.mid			as mid
                                                , a.scgrp			as scgrp
                                                , a.wstat 			as wstat
                                                , count(a.ActStdt)	as cnt
                                                from tmigscene a
                                                where a.mid = ?
                                                group by a.mid, a.scgrp, a.wstat
                                            ) x
                                        join tmigcode y
                                            on x.mid = y.mid
                                        order by x.mid, x.scgrp, x.wstat)
                                    select mid																				  as mid		-- 이행코드
                                        , '0.전체'																			  as scgrp
                                        , max(xx.cnt1) 																		  as plancnt	-- 수행시나리오계획건수
                                        , max(xx.cnt2) 																		  as ingcnt		-- 수행시나리오진행중건수
                                        , max(xx.cnt3) 																		  as comcnt		-- 수행시나리오작업완료건수
                                        , max(xx.cnt4) 																		  as errcnt		-- 수행시나리오작업오류건수
                                        , max(xx.cnt1)+max(xx.cnt2)+max(xx.cnt3)+max(xx.cnt4) 								  as totcnt		-- 수행시나리오건수
                                        , round(max(xx.cnt3)/((max(xx.cnt1)+max(xx.cnt2)+max(xx.cnt3)+max(xx.cnt4)))*100,2)   as totrate	-- 비율(수행시나리오건수/총시나리오건수)
                                    from (
                                            select aa.mid
                                                , case aa.wstat when 0 then aa.wstat else '' end 		as wstat1
                                                , case aa.wstat when 0 then aa.cnt else '' end 		    as cnt1
                                                , case aa.wstat when 0 then aa.scenario else '' end 	as scenario1
                                                , case aa.wstat when 1 then aa.wstat else '' end 		as wstat2
                                                , case aa.wstat when 1 then aa.cnt else '' end 		    as cnt2
                                                , case aa.wstat when 1 then aa.scenario else '' end 	as scenario2
                                                , case aa.wstat when 2 then aa.wstat else '' end 		as wstat3
                                                , case aa.wstat when 2 then aa.cnt else '' end 		    as cnt3
                                                , case aa.wstat when 2 then aa.scenario else '' end 	as scenario3
                                                , case aa.wstat when 3 then aa.wstat else '' end 		as wstat4
                                                , case aa.wstat when 3 then aa.cnt else '' end 		    as cnt4
                                                , case aa.wstat when 3 then aa.scenario else '' end 	as scenario4
                                                , case aa.wstat when 4 then aa.wstat else '' end 		as wstat5
                                                , case aa.wstat when 4 then aa.cnt else '' end 		    as cnt5
                                                , case aa.wstat when 4 then aa.scenario else '' end 	as scenario5
                                            from timg_tot aa
                                            ) xx
                                    group by xx.mid 
                                    union all
                                    select xx.mid																			  as mid		-- 이행코드
                                        , xx.scgrp																			  as scgrp
                                        , max(xx.cnt1) 																		  as plancnt	-- 수행시나리오계획건수
                                        , max(xx.cnt2) 																		  as ingcnt		-- 수행시나리오진행중건수
                                        , max(xx.cnt3) 																		  as comcnt		-- 수행시나리오작업완료건수
                                        , max(xx.cnt4) 																		  as errcnt		-- 수행시나리오작업오류건수
                                        , max(xx.cnt1)+max(xx.cnt2)+max(xx.cnt3)+max(xx.cnt4) 								  as totcnt		-- 수행시나리오건수
                                        , round(max(xx.cnt3)/((max(xx.cnt1)+max(xx.cnt2)+max(xx.cnt3)+max(xx.cnt4)))*100,2)   as totrate	-- 비율(수행시나리오건수/총시나리오건수)
                                    from (
                                            select aa.mid												as mid
                                                , aa.scgrp 											    as scgrp
                                                , case aa.wstat when 0 then aa.wstat else '' end 		as wstat1
                                                , case aa.wstat when 0 then aa.cnt else 0 end 			as cnt1
                                                , case aa.wstat when 0 then aa.scenario else '' end 	as scenario1
                                                , case aa.wstat when 1 then aa.wstat else '' end 		as wstat2
                                                , case aa.wstat when 1 then aa.cnt else 0 end 			as cnt2
                                                , case aa.wstat when 1 then aa.scenario else '' end 	as scenario2
                                                , case aa.wstat when 2 then aa.wstat else '' end 		as wstat3
                                                , case aa.wstat when 2 then aa.cnt else 0 end 			as cnt3
                                                , case aa.wstat when 2 then aa.scenario else '' end 	as scenario3
                                                , case aa.wstat when 3 then aa.wstat else '' end 		as wstat4
                                                , case aa.wstat when 3 then aa.cnt else 0 end 			as cnt4
                                                , case aa.wstat when 3 then aa.scenario else '' end 	as scenario4
                                                , case aa.wstat when 4 then aa.wstat else '' end 		as wstat5
                                                , case aa.wstat when 4 then aa.cnt else 0 end 			as cnt5
                                                , case aa.wstat when 4 then aa.scenario else '' end 	as scenario5
                                            from timg aa
                                            ) xx
                                    group by xx.mid, xx.scgrp	                    
                                    `, [args.query.mid,args.query.mid] ) ;
        return(rows) ;
      },    
    /**
     * 이행 우측 세부 이행 시나리오
     * 테이블 List
     */
    ttranssclist : async (args) => {
        let rows = await mondb.query(` with t as
                                            (select sid			as sid				-- 수행차수		
                                                , tstime		as tstime			-- 테스트일시
                                                , stime			as stime			-- 시작시간 
                                                , etime			as etime			-- 종료시간
                                                , svctime		as svctime			-- 소요시간
                                                , stime_asis	as stimeasis		-- ASIS시작시간
                                                , etime_asis	as etimeasis		-- ASIS종료시간
                                                , svctime_asis	as svctimeasis		-- ASIS소요시간
                                                , regdt  		as regdt        	-- 등록시간
                                            from tperftest
                                            where tid in (select max(tid) as tid
                                                            from tperfcode
                                                            where gb='3'
                                                            and lastDt = ?
                                                            and asisDt = ?
                                                        )
                                            group by sid)
                                        select x.apnm                   					as apnm			-- 업무명
                                            -- , x.scnt                    					as scnt			-- 향상
                                            -- , x.nocnt                   					as nocnt		-- 미수행
                                            -- , x.tcnt - (x.nocnt + x.scnt)					as delay		-- 지연
                                            , case when x.scnt=1 and x.nocnt=0 then '향상' 
                                                when x.scnt=0 and x.nocnt=1 then '미수행'
                                                else '지연' end 							as gubun		-- 구분
                                            , NVL(tstime,'')							    as tstime		-- 테스트일시
                                            , NVL(stime,'')								    as stime		-- 시작시간 
                                            , NVL(etime,'')								    as etime		-- 종료시간
                                            , NVL(svctime,'')								as svctime		-- 소요시간
                                            , NVL(stimeasis,'')							    as stimeasis	-- ASIS시작시간
                                            , NVL(etimeasis,'')							    as etimeasis	-- ASIS종료시간
                                            , NVL(svctimeasis,'')							as svctimeasis	-- ASIS소요시간
                                            , NVL(regdt,'')  								as regdt        -- 등록시간
                                        from (
                                                select a.apnm                           as apnm			-- 업무명
                                                    , 1									as tcnt			-- 향상
                                                    , if(t.svctime < t.svctimeasis,1,0)	as scnt			-- 미수행
                                                    , if(t.sid is null,1,0)		        as nocnt		-- 지연
                                                    , t.tstime							as tstime		-- 테스트일시
                                                    , t.stime							as stime		-- 시작시간 
                                                    , t.etime							as etime		-- 종료시간
                                                    , t.svctime							as svctime		-- 소요시간
                                                    , t.stimeasis						as stimeasis	-- ASIS시작시간
                                                    , t.etimeasis						as etimeasis	-- ASIS종료시간
                                                    , t.svctimeasis						as svctimeasis	-- ASIS소요시간
                                                    , t.regdt  							as regdt        -- 등록시간
                                                from tsid s
                                                join tapid a
                                                    on (s.apid = a.apid)
                                                left join t
                                                    on (s.sid = t.sid)
                                            ) x
                                    `, [args.query.tobedt,args.query.asisdt] ) ;
        return(rows) ;
      },     
}
 
export default tmigscene ;