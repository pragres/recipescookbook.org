<?php

u("net/pChart/class/pData.class");
u("net/pChart/class/pDraw.class");
u("net/pChart/class/pPie.class");
u("net/pChart/class/pImage.class");

class DefaultPieChart extends pImage{

	/**
	 * Constructor
	 *
	 * @param array $points
	 * @param array $labels
	 * @param string $description
	 * @param boolean $autoOutput
	 * @return ApretasteDefaultLinearGraph
	 */
	public function __construct($points, $labels, $description, $autoOutput = true){
		$palette = array();
		
		foreach($points as $p) {
			$palette[] = array("R" => mt_rand(1,255), "G" => mt_rand(1,255), "B" => mt_rand(1,255), "Alpha" => 99);
		}
		
		$d = new pData();
		$d->addPoints($points, "ScoreA");
		$d->setSerieDescription("ScoreA", $description);
		$d->addPoints($labels, "Labels");
		$d->setAbscissa("Labels");
		$d->Palette = $palette;

		parent::pImage(400,230,$d,TRUE);
		$this->setFontProperties(array("FontName"=>PACKAGES."net/pChart/fonts/verdana.ttf","FontSize"=>12,"R"=>80,"G"=>80,"B"=>80));
		$PieChart = new pPie($this,$d);
		$this->setShadow(TRUE,array("X"=>2,"Y"=>2,"R"=>0,"G"=>0,"B"=>0,"Alpha"=>10));
		$PieChart->draw2DPie(120,100,array("Radius"=>100,"DataGapAngle"=>10,"DataGapRadius"=>0,"Border"=>TRUE));
		$this->setFontProperties(array("FontName"=>PACKAGES."net/pChart/fonts/verdana.ttf","FontSize"=>10,"R"=>0,"G"=>0,"B"=>0));
		$PieChart->drawPieLegend(250,5,array("Style"=>LEGEND_NOBORDER,"Mode"=>LEGEND_VERTICAL));
		
		if ($autoOutput === true) $this->autoOutput();

	}
}

// End of file